/**
 * Graphics Manager
 * Handles switching between 2D and 3D rendering
 */

const Renderer3D = require('./renderer3d');
const Renderer2D = require('./renderer2d');

class GraphicsManager {
  constructor(settings) {
    if (!settings || typeof settings !== 'object') {
      throw new Error('GraphicsManager requires a settings object');
    }

    // Basic validation
    if (!settings.resolution || typeof settings.resolution.width !== 'number' || typeof settings.resolution.height !== 'number') {
      throw new Error('settings.resolution.{width,height} must be provided as numbers');
    }

    this.settings = settings;
    this.renderer = null;
    this.mode = settings.graphicsMode || '2d'; // '2d' or '3d'
    this.width = settings.resolution.width;
    this.height = settings.resolution.height;
    this.isInitialized = false;

    // Ensure setGraphicsMode is callable; if not, provide a no-op to avoid runtime errors
    if (typeof this.settings.setGraphicsMode !== 'function') {
      this.settings.setGraphicsMode = function (mode) {
        this.graphicsMode = mode;
      };
    }
  }

  /**
   * Initialize graphics based on mode
   */
  initializeGraphics() {
    // Create renderer according to current mode
    if (this.mode === '3d') {
      this.renderer = new Renderer3D(this.width, this.height);
      // Prefer initScene, fall back to init if provided
      if (this.renderer && typeof this.renderer.initScene === 'function') {
        this.renderer.initScene();
      } else if (this.renderer && typeof this.renderer.init === 'function') {
        this.renderer.init();
      }
      console.log('✅ 3D Renderer initialized (Three.js)');
    } else {
      this.renderer = new Renderer2D(this.width, this.height);
      if (this.renderer && typeof this.renderer.init === 'function') {
        this.renderer.init();
      } else if (this.renderer && typeof this.renderer.initScene === 'function') {
        // Some 2D renderers might expose initScene
        this.renderer.initScene();
      }
      console.log('✅ 2D Renderer initialized (Canvas)');
    }

    this.isInitialized = true;
    return this.renderer;
  }

  _initAfterDispose(newMode) {
    // Switch mode in settings and initialize new renderer
    this.mode = newMode;
    try {
      this.settings.setGraphicsMode(newMode);
    } catch (err) {
      // swallow to avoid breaking switch, but log for debugging
      console.warn('settings.setGraphicsMode failed:', err);
    }
    this.isInitialized = false;
    this.initializeGraphics();
    console.log(`🔄 Switched to ${newMode.toUpperCase()} mode`);
  }

  /**
   * Switch graphics mode (2D <-> 3D)
   * Note: dispose() may return a Promise for async cleanup; we handle both sync and async disposals.
   */
  switchMode(newMode) {
    if (newMode === this.mode) {
      console.log(`Already in ${newMode.toUpperCase()} mode`);
      return false;
    }

    // Cleanup current renderer
    let disposeResult = null;
    if (this.renderer && typeof this.renderer.dispose === 'function') {
      try {
        disposeResult = this.renderer.dispose();
      } catch (err) {
        console.warn('Error while disposing renderer:', err);
      }
    }

    // If dispose returned a promise, initialize after it resolves to avoid races
    if (disposeResult && typeof disposeResult.then === 'function') {
      disposeResult.then(() => this._initAfterDispose(newMode)).catch((err) => {
        console.warn('Renderer dispose promise rejected:', err);
        // still attempt to initialize
        this._initAfterDispose(newMode);
      });
    } else {
      // Synchronous dispose or no dispose method: proceed immediately
      this._initAfterDispose(newMode);
    }

    return true;
  }

  /**
   * Get current renderer
   */
  getRenderer() {
    return this.renderer;
  }

  /**
   * Get current mode
   */
  getMode() {
    return this.mode;
  }

  /**
   * Update graphics quality
   */
  setQuality(quality) {
    this.settings.quality = quality;

    if (this.mode === '3d' && this.renderer) {
      // Determine device pixel ratio safely (support non-browser environments)
      const devicePixelRatio = (typeof window !== 'undefined' && window && window.devicePixelRatio) ? window.devicePixelRatio : 1;

      switch (quality) {
        case 'low':
          if (this.renderer.renderer && typeof this.renderer.renderer.setPixelRatio === 'function') {
            this.renderer.renderer.setPixelRatio(0.5);
          } else if (typeof this.renderer.setPixelRatio === 'function') {
            this.renderer.setPixelRatio(0.5);
          }
          if (typeof this.renderer.shadows !== 'undefined') this.renderer.shadows = false;
          break;
        case 'medium':
          if (this.renderer.renderer && typeof this.renderer.renderer.setPixelRatio === 'function') {
            this.renderer.renderer.setPixelRatio(1);
          } else if (typeof this.renderer.setPixelRatio === 'function') {
            this.renderer.setPixelRatio(1);
          }
          if (typeof this.renderer.shadows !== 'undefined') this.renderer.shadows = true;
          break;
        case 'high':
          if (this.renderer.renderer && typeof this.renderer.renderer.setPixelRatio === 'function') {
            this.renderer.renderer.setPixelRatio(devicePixelRatio);
          } else if (typeof this.renderer.setPixelRatio === 'function') {
            this.renderer.setPixelRatio(devicePixelRatio);
          }
          if (typeof this.renderer.shadows !== 'undefined') this.renderer.shadows = true;
          break;
      }
    }
  }

  /**
   * Render frame
   */
  render(playerStats) {
    if (!this.isInitialized) return;

    if (this.mode === '3d') {
      if (this.renderer && typeof this.renderer.render === 'function') {
        this.renderer.render();
      }
    } else {
      if (this.renderer && typeof this.renderer.render === 'function') {
        this.renderer.render(playerStats);
      }
    }
  }

  /**
   * Handle input
   */
  handleInput(keys) {
    if (this.mode === '2d' && this.renderer && typeof this.renderer.handleInput === 'function') {
      this.renderer.handleInput(keys);
    }
  }

  /**
   * Create character in graphics
   */
  createCharacter(name, type = 'warrior') {
    if (!this.isInitialized) return null;

    if (this.mode === '3d') {
      if (typeof this.renderer.createCharacter === 'function') {
        return this.renderer.createCharacter(name, type);
      }
      return null;
    } else {
      if (typeof this.renderer.createCharacterSprite === 'function') {
        return this.renderer.createCharacterSprite(name, type);
      }
      return null;
    }
  }

  /**
   * Create environment object
   */
  createEnvironment(name, type = 'castle') {
    if (!this.isInitialized) return null;

    if (this.mode === '3d') {
      if (typeof this.renderer.createEnvironmentObject === 'function') {
        return this.renderer.createEnvironmentObject(name, type);
      }
      return null;
    } else {
      // 2D renderer may expose createEnvironmentSprite; if not, throw a clear error
      if (this.renderer && typeof this.renderer.createEnvironmentSprite === 'function') {
        return this.renderer.createEnvironmentSprite(name, type);
      }
      throw new Error('createEnvironment is not supported in 2D mode by the current renderer');
    }
  }

  /**
   * Animate object
   */
  animate(objectName, animationType = 'idle') {
    if (this.mode === '3d' && this.renderer && typeof this.renderer.animateObject === 'function') {
      this.renderer.animateObject(objectName, animationType);
    }
  }

  /**
   * Handle window resize
   */
  onWindowResize(width, height) {
    this.width = width;
    this.height = height;
    if (this.renderer && typeof this.renderer.onWindowResize === 'function') {
      this.renderer.onWindowResize(width, height);
    }
  }

  /**
   * Get FPS
   */
  getFPS() {
    if (this.renderer && typeof this.renderer.getFPS === 'function') {
      return this.renderer.getFPS();
    }
    return 0;
  }

  /**
   * Cleanup
   */
  dispose() {
    if (this.renderer && typeof this.renderer.dispose === 'function') {
      const res = this.renderer.dispose();
      this.renderer = null;
      this.isInitialized = false;
      return res;
    }
    this.renderer = null;
    this.isInitialized = false;
    return null;
  }
}

module.exports = GraphicsManager;

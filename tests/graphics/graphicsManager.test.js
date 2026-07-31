const GraphicsManager = require('../../src/graphics/graphicsManager');

jest.mock('../../src/graphics/renderer3d', () => {
  return jest.fn().mockImplementation((width, height) => {
    return {
      initScene: jest.fn(),
      dispose: jest.fn(),
      renderer: { setPixelRatio: jest.fn() },
      shadows: true,
      render: jest.fn(),
      createCharacter: jest.fn().mockReturnValue({ name: '3dchar' }),
      createEnvironmentObject: jest.fn().mockReturnValue({ env: '3d' }),
      animateObject: jest.fn(),
      onWindowResize: jest.fn(),
      getFPS: jest.fn().mockReturnValue(60),
    };
  });
});

jest.mock('../../src/graphics/renderer2d', () => {
  return jest.fn().mockImplementation((width, height) => {
    return {
      dispose: jest.fn(),
      render: jest.fn(),
      handleInput: jest.fn(),
      createCharacterSprite: jest.fn().mockReturnValue({ name: '2dchar' }),
      createEnvironmentSprite: jest.fn().mockReturnValue({ env: '2d' }),
      onWindowResize: jest.fn(),
      getFPS: jest.fn().mockReturnValue(30),
    };
  });
});

describe('GraphicsManager', () => {
  let settings;

  beforeEach(() => {
    // Default settings: start in 2d
    settings = {
      graphicsMode: '2d',
      resolution: { width: 800, height: 600 },
      quality: 'medium',
      setGraphicsMode: jest.fn(function (mode) { this.graphicsMode = mode; }),
    };
  });

  test('initializeGraphics creates correct renderer for 2d and switches to 3d', () => {
    const gm = new GraphicsManager(settings);

    // initialize 2D
    const r2 = gm.initializeGraphics();
    expect(r2).toBeDefined();
    expect(gm.getMode()).toBe('2d');

    // switch to 3D
    const switched = gm.switchMode('3d');
    expect(switched).toBe(true);
    expect(settings.setGraphicsMode).toHaveBeenCalledWith('3d');
    expect(gm.getMode()).toBe('3d');

    // renderer3d should be initialized
    const renderer3d = gm.getRenderer();
    expect(renderer3d.initScene).toHaveBeenCalled();
  });

  test('setQuality updates 3d renderer pixel ratio and shadows when window.devicePixelRatio present', () => {
    // ensure a devicePixelRatio exists
    global.window = { devicePixelRatio: 2 };

    const gm = new GraphicsManager(settings);
    gm.switchMode('3d'); // will initialize 3d renderer

    gm.setQuality('high');

    const renderer3d = gm.getRenderer();
    expect(renderer3d.renderer.setPixelRatio).toHaveBeenCalledWith(2);
    expect(renderer3d.shadows).toBe(true);

    // cleanup
    delete global.window;
  });

  test('setQuality in non-browser environment (no window) should fall back to pixel ratio 1', () => {
    // simulate non-browser by ensuring window is undefined
    delete global.window;

    const gm = new GraphicsManager(settings);
    gm.switchMode('3d');

    expect(() => gm.setQuality('high')).not.toThrow();
    const renderer3d = gm.getRenderer();
    expect(renderer3d.renderer.setPixelRatio).toHaveBeenCalledWith(1);
  });

  test('createEnvironment returns environment object for both 2d and 3d if renderer supports it', () => {
    const gm = new GraphicsManager(settings);

    // initialize 2D
    gm.initializeGraphics();
    const env2 = gm.createEnvironment('castle');
    // Now implementation supports createEnvironmentSprite for 2D
    expect(env2).toBeDefined();
    expect(env2).toHaveProperty('env', '2d');

    // switch to 3D
    gm.switchMode('3d');
    const env3 = gm.createEnvironment('castle');
    expect(env3).toBeDefined();
    expect(env3).toHaveProperty('env', '3d');
  });
});

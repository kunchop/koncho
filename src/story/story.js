/**
 * Story content and narrative structure
 */

class Story {
  constructor() {
    this.scenes = this.initializeScenes();
  }

  initializeScenes() {
    return {
      start: {
        text: `You awaken in a small tavern in the village of Millhaven.
The air is thick with the smell of ale and roasted meat.
A grizzled bartender looks at you with curious eyes.

"Welcome, stranger. I haven't seen you around these parts before.
Bad timing, if you ask me. Strange things have been happening in the forest.
Folks say there's a dark power stirring..."`,
        choices: [
          { text: 'Ask the bartender about the dark power', nextScene: 'bartender_dialogue' },
          { text: 'Head straight to the forest to investigate', nextScene: 'forest_entrance' },
          { text: 'Visit the town elder for more information', nextScene: 'elder_house' }
        ]
      },
      
      bartender_dialogue: {
        text: `The bartender leans closer, his voice dropping to a whisper.

"They say ancient ruins have awakened in the Darkwood Forest.
Monsters that haven't been seen in centuries are emerging.
The local militia is too weak to handle it. They need a hero..."

He slides a worn map across the bar.`,
        choices: [
          { text: 'Take the map and head to the forest', nextScene: 'forest_entrance' },
          { text: 'Ask about the ancient ruins', nextScene: 'ruins_info' },
          { text: 'Request supplies before leaving', nextScene: 'supplies' }
        ]
      },

      forest_entrance: {
        text: `You stand at the edge of the Darkwood Forest.
Tall, twisted trees loom overhead, their branches forming an almost impenetrable canopy.
An eerie silence hangs over the woods. Strange symbols are carved into the nearest tree.

You feel a chill run down your spine.`,
        choices: [
          { text: 'Enter the forest cautiously', nextScene: 'forest_deep' },
          { text: 'Examine the strange symbols', nextScene: 'ancient_symbols' },
          { text: 'Turn back and gather more information', nextScene: 'start' }
        ]
      },

      elder_house: {
        text: `The town elder's cottage is small but well-kept.
Inside, an ancient woman sits by a fireplace, knitting.

"Ah, a new arrival. I sense great destiny about you.
The darkness that stirs in our forest... it is older than our village.
Older than our kingdom. It must be stopped, or all will fall to shadow."`,
        choices: [
          { text: 'Ask the elder for guidance', nextScene: 'elder_guidance' },
          { text: 'Request ancient weapons or artifacts', nextScene: 'elder_gift' },
          { text: 'Head to the forest immediately', nextScene: 'forest_entrance' }
        ]
      },

      ancient_symbols: {
        text: `As you study the symbols, your vision blurs.
Flashes of ancient memories flood your mind:
A great civilization. Magic beyond comprehension. A terrible betrayal.

The symbols glow faintly with arcane power. You understand now—
this darkness is no accident. It has been deliberately awakened.`,
        choices: [
          { text: 'Proceed deeper into the forest with newfound knowledge', nextScene: 'forest_deep' },
          { text: 'Return to the village to warn them', nextScene: 'village_warning' }
        ]
      },

      forest_deep: {
        text: `Deep in the forest, you come across a clearing.
In the center stands an ancient stone structure—covered in moss and decay.
As you approach, a low growl echoes through the trees.

Shadow creatures begin to emerge from the darkness...`,
        choices: [
          { text: 'Prepare for combat', nextScene: 'combat_encounter' },
          { text: 'Attempt to communicate with the creatures', nextScene: 'shadow_communication' },
          { text: 'Run back toward the forest entrance', nextScene: 'forest_escape' }
        ]
      },

      combat_encounter: {
        text: `You draw your weapon and steel yourself for battle.
Three shadow creatures circle you, their forms twisted and unnatural.

You steel yourself for an epic battle!`,
        choices: [
          { text: 'Attack with all your might', nextScene: 'combat_victory' },
          { text: 'Use a defensive stance and wait for an opening', nextScene: 'combat_tactical' }
        ]
      },

      combat_victory: {
        text: `With a mighty cry, you charge forward!
Your weapon cuts through the shadow creatures like they were made of mist.
With each strike, they dissipate into nothingness.

Victory is yours! You gain 100 gold and 150 experience!`,
        choices: [
          { text: 'Examine the ancient structure', nextScene: 'ancient_structure' },
          { text: 'Return to the village with news of your victory', nextScene: 'village_hero' }
        ]
      },

      combat_tactical: {
        text: `You take a defensive stance, letting the creatures exhaust themselves.
Their attacks grow weaker as they tire. Then, in a flash of inspiration,
you see their weakness—a faint light in their chests.

With a perfectly timed strike, you destroy all three creatures!

You gain 100 gold and 150 experience!`,
        choices: [
          { text: 'Examine the ancient structure', nextScene: 'ancient_structure' },
          { text: 'Return to the village with news of your victory', nextScene: 'village_hero' }
        ]
      },

      ancient_structure: {
        text: `You carefully approach the ancient stone structure.
Inside, you find a chamber lined with ancient runes.
In the center sits a crystalline object that pulses with an otherworldly light.

This is the source of the darkness. The crystal is being corrupted by dark magic.

Will you try to purify it, or will you attempt to destroy it?`,
        choices: [
          { text: 'Attempt to purify the crystal', nextScene: 'purify_crystal' },
          { text: 'Try to destroy the crystal', nextScene: 'destroy_crystal' },
          { text: 'Take the crystal and bring it back to the village', nextScene: 'take_crystal' }
        ]
      },

      purify_crystal: {
        text: `You focus your inner light on the crystal.
Slowly, the dark corruption begins to fade.
The crystal glows brighter and brighter until...

A blinding flash! The darkness is banished!
The forest around you begins to heal. Light returns to the world.

🌟 YOU HAVE SAVED THE REALM! 🌟
The people will sing songs of your heroism for generations to come!`,
        choices: [
          { text: 'THE END - Good Ending', nextScene: null }
        ]
      },

      destroy_crystal: {
        text: `You raise your weapon and smash the crystal!
It shatters into a thousand pieces, each fragment dissipating into ash.
The darkness screams and convulses before fading away completely.

The forest is free. The threat is gone forever.

⚔️ YOU HAVE TRIUMPHED! ⚔️
You are hailed as a hero throughout the land!`,
        choices: [
          { text: 'THE END - Warrior Ending', nextScene: null }
        ]
      },

      take_crystal: {
        text: `You carefully place the crystal in your satchel.
The darkness in the forest seems to dissipate temporarily, but you sense it's not over.
This crystal holds immense power—both good and evil.

As you return to the village, you wonder what secrets it might reveal...`,
        choices: [
          { text: 'THE END - To Be Continued...', nextScene: null }
        ]
      },

      village_hero: {
        text: `You return to Millhaven as a hero!
The people cheer your name. The bartender buys you a drink.
The elder approaches you with tears in her eyes.

"You have saved us all. The darkness is no more.
You shall be remembered forever as the one who brought light back to our world."

✨ YOUR LEGEND BEGINS HERE ✨`,
        choices: [
          { text: 'THE END - Hero Ending', nextScene: null }
        ]
      },

      shadow_communication: {
        text: `You attempt to speak with the shadow creatures in a calm, measured voice.
To your surprise, they pause. A voice echoes in your mind—ancient and weary.

"You... you are different. You do not attack with blind rage.
Maybe... maybe there is hope after all."`,
        choices: [
          { text: 'Ask the creatures why they attack the village', nextScene: 'shadow_truth' },
          { text: 'Demand they leave immediately', nextScene: 'combat_encounter' }
        ]
      },

      shadow_truth: {
        text: `The creature explains: "We are bound to the crystal by dark magic.
We do not wish to harm your people. We are prisoners, forced to serve.
If you free us, we will vanish, and the darkness will lift."

You realize there may be a peaceful solution...`,
        choices: [
          { text: 'Promise to free them and head to the ancient structure', nextScene: 'ancient_structure' },
          { text: 'Thank them but choose to destroy the crystal anyway', nextScene: 'destroy_crystal' }
        ]
      },

      forest_escape: {
        text: `You turn and run, crashing through the dense forest.
The shadow creatures pursue, but gradually fade as you reach the forest edge.

You made it out alive, but the darkness still lurks in the forest.
You'll need to find a better solution...`,
        choices: [
          { text: 'Return to the village to regroup', nextScene: 'start' },
          { text: 'Gather supplies and prepare for a real battle', nextScene: 'supplies' }
        ]
      },

      supplies: {
        text: `The shopkeeper eyes you carefully.
"Heading into danger, are you? I've got just what you need."

You purchase healing potions, a better weapon, and ancient armor.
You feel ready now.`,
        choices: [
          { text: 'Head to the forest with newfound strength', nextScene: 'forest_entrance' }
        ]
      },

      ruins_info: {
        text: `The bartender nods knowingly.
"The ruins are old—older than the kingdom itself.
They say ancient magic sleeps there. Magic that was meant to stay dormant.
But someone—or something—has awakened it."

He pauses, looking into the distance.
"If those ruins fully awaken, the darkness will consume everything."`,
        choices: [
          { text: 'Take the map and head to the forest', nextScene: 'forest_entrance' },
          { text: 'Ask for more details about the ancient magic', nextScene: 'elder_house' }
        ]
      },

      elder_guidance: {
        text: `The elder rises and places a weathered hand on your shoulder.
"Listen well, young one. The darkness is powerful, but it is not invincible.
Seek the crystal at the heart of the ancient ruins.
It is both the source of the darkness and your salvation.

What you do with it will determine the fate of all."

She gives you a mysterious amulet that glows softly.`,
        choices: [
          { text: 'Head to the forest with the amulet', nextScene: 'forest_entrance' }
        ]
      },

      elder_gift: {
        text: `The elder walks to an old chest and retrieves an ornate weapon.
"This blade has been passed down through generations of heroes.
May it serve you well in the darkness ahead."

You receive: Sword of Dawn (A legendary weapon with +5 attack!)`,
        choices: [
          { text: 'Thank the elder and head to the forest', nextScene: 'forest_entrance' }
        ]
      },

      village_warning: {
        text: `You rush back to the village and gather the townspeople.
You warn them of the danger, showing them the symbols you discovered.

The elder nods gravely. "So it has begun. We must prepare our defenses.
But only you can stop this at its source."

The village rallies behind you with supplies and encouragement.`,
        choices: [
          { text: 'Return to the forest with the village\'s support', nextScene: 'forest_deep' }
        ]
      }
    };
  }

  getScene(sceneId) {
    return this.scenes[sceneId] || null;
  }
}

module.exports = Story;

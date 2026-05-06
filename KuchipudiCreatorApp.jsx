import { useState, useEffect } from "react";

// ─── PALETTE & FONTS ─────────────────────────────────────────────────────────
const T = {
  bg: "#0C0806", card: "#140A04", border: "#2A1508",
  orange: "#C4622D", gold: "#B8860B", green: "#2E6B5E",
  purple: "#7B3F6E", blue: "#1A5276", brown: "#5D4037",
  text: "#F5ECD7", muted: "#806040", faint: "#4A3020",
  font: "'Playfair Display', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
};

const CAT = {
  STORY:   { c: T.orange, icon: "📖", label: "Story" },
  ART:     { c: T.gold,   icon: "💃", label: "Art" },
  CONTEXT: { c: T.green,  icon: "🎓", label: "Context" },
  DOUBT:   { c: T.purple, icon: "🌑", label: "Doubt" },
  TREND:   { c: T.blue,   icon: "🔥", label: "Trend" },
  BTS:     { c: T.brown,  icon: "🎬", label: "BTS" },
  JOURNEY: { c: T.orange, icon: "🏆", label: "Journey" },
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const REELS = [
  // STORY 1-30
  {id:1,cat:"STORY",title:"The Day I Told My Boss",music:"Quiet lo-fi acoustic, no lyrics, Tuesday morning feel.",concept:"Your two worlds collide. The vulnerability of being seen as a classical dancer by people who only know you as a professional.",dance:"No choreography. End with one sharp mudra and eye movement — contrast against the office setting.",outfit:"Work clothes → hard cut to partial costume for final 4-second dance moment.",location:"Your desk or home office. Quick cut to practice corner.",hook:"Black screen, white text: 'I told my coworkers I compete in classical dance.' Cut to your face. 'The room went very quiet.'",caption:"The thing about having two lives is that eventually they meet. 🎭 #DancerLife #IndianDancer"},
  {id:2,cat:"STORY",title:"6 AM Dance Bag",music:"Silence 3 seconds — only ankle bells. Then soft lo-fi morning beat.",concept:"The invisible sacrifice. Nobody sees the 6 AM version of you. This is before the world is awake.",dance:"No formal dance. The ankle bells are the performance. Let them ring when you place them in the bag.",outfit:"Casual morning clothes. The contrast between what you're wearing and what you're packing is the point.",location:"Bedroom floor or living room. Early morning natural light.",hook:"Close-up phone alarm: 5:45 AM. Hands picking up ankle bells. The bells ring.",caption:"Nobody sees this part. 5:45 AM, dance bag packed, work bag right next to it. 🌅"},
  {id:3,cat:"STORY",title:"The Phone Call to Mom",music:"Slow, warm veena or sarangi instrumental. Feels like home — India, not Texas.",concept:"The moment you told your mother you were coming back to dance. What she said. What you didn't expect.",dance:"Brief gentle movements at the end — movement as emotion, not choreography.",outfit:"Home clothes. Comfortable. This is not a performance setting.",location:"Wherever you take phone calls at home — couch, bedroom, kitchen.",hook:"You, phone in hand. Text: 'The first person I called when I decided to come back was my mother.' Then: 'I did not expect to cry.'",caption:"She said 'I always knew you would come back.' I had not told myself that yet. 📞🤍"},
  {id:4,cat:"STORY",title:"When He Heard the Ankle Bells",music:"Original audio — actual sound of ankle bells in your apartment. No music for first 5 seconds.",concept:"The first time your husband heard classical ankle bells ringing in the house. His reaction — confused, curious, then warmer.",dance:"Wear the ankle bells. Walk through home naturally. Then one slow footwork sequence.",outfit:"Casual clothes. Ankle bells on your feet. The contrast is visually interesting.",location:"Your home — hallway, living room. Wherever he first heard it.",hook:"Close-up of ankle bells on feet against home floor. Bells ringing with every step. Text: 'The first time he heard these in our apartment...'",caption:"He came out and said 'what IS that sound.' Now he can tell when I'm practicing by the rhythm. 🔔"},
  {id:5,cat:"STORY",title:"Clicking Submit",music:"Silence. Then when the submit moment happens — a single note or beginning of your competition piece.",concept:"The exact moment you committed. Everything before that click was thinking. After it was doing.",dance:"Your hands at the keyboard. Then cut to opening movement of your competition piece.",outfit:"Home clothes for registration. Practice clothes for dance cut.",location:"Desk or couch. Then practice space.",hook:"Close-up of finger hovering over 'Submit Registration'. Text: 'My finger hovered for 40 seconds.' The click. The receipt screen.",caption:"40 seconds of hovering. 12 years of waiting. One click. Let's go. 🖱️"},
  {id:6,cat:"STORY",title:"The Costume That Changed Size",music:"Soft classical instrumental — gentle, not dramatic. Feels like memory.",concept:"Twelve years leave a mark on a body. The costume that fit perfectly now fits differently.",dance:"Put the costume on. Move in it. Show where it fits the same and where it fits differently. One slow turn.",outfit:"Your actual Kuchipudi performance costume — from before the break if you have it.",location:"In front of a full-length mirror. Natural light.",hook:"Hands holding up the costume. Text: 'I wore this 12 years ago.' Then you begin putting it on.",caption:"Some things stretch. Some things shrink. The costume fits differently now. So do I. 🪡"},
  {id:7,cat:"STORY",title:"The Night I Told Him",music:"Quiet intimate instrumental — sounds like a late evening at home.",concept:"The specific conversation where you told your husband you wanted to compete. What the room was like. What he said.",dance:"A brief single movement at the very end — as punctuation.",outfit:"Home clothes — whatever you were actually wearing that evening.",location:"Wherever that conversation happened. Living room, kitchen table, bedroom.",hook:"You sitting. Text: 'I told my husband I wanted to compete in classical dance for the first time in 12 years.' Then: 'He did not hesitate.'",caption:"I expected him to ask questions. He asked one: 'When do you start training?' 🤍"},
  {id:8,cat:"STORY",title:"My Guru's Face",music:"Original audio of the class room. Then gentle classical music.",concept:"The expression on your guru's face when you walked back into her class after 12 years. What it meant.",dance:"Film yourself doing the opening of your piece in her studio, with her in the background watching.",outfit:"Practice clothes — what you wore that first day back.",location:"Your guru's dance studio.",hook:"Text: 'I walked into her studio after 12 years.' Close-up of your face. 'I did not expect her to remember every detail about how I move.'",caption:"A real guru does not just teach dance. She holds a version of you in safekeeping. She gave it back. 🙏"},
  {id:9,cat:"STORY",title:"Mother-in-Law Watches Practice",music:"Warm South Indian classical — familiar to an Indian woman of her generation.",concept:"Showing your practice video to your mother-in-law. Her unfiltered reaction — what she noticed, what she said.",dance:"The practice footage she watches. Include her face watching if she agrees.",outfit:"Practice clothes in the video. Home clothes in the room with her.",location:"Your home or her home.",hook:"Your phone showing your dance video. Text: 'I showed my mother-in-law my practice video.' Then her face. Then what she said.",caption:"She watched in silence. Then said: 'Do this one again, slower.' She is now my second guru. 🌸"},
  {id:10,cat:"STORY",title:"The Costume at Home",music:"His voice if you have candid audio. Otherwise warm, playful instrumental.",concept:"The first time you wore your full Kuchipudi costume at home. His genuine reaction in your shared living room.",dance:"One sequence in the costume in your living room. Classical costume against home furniture is striking.",outfit:"Full classical Kuchipudi performance costume — all jewellery, makeup if possible.",location:"Your living room or kitchen — home setting contrasting with formal costume.",hook:"You standing in full costume in your living room. Text: 'He had never seen me in full costume before.'",caption:"He went quiet for a second. Then: 'You look like a different person.' I said: 'I am.' 💫"},
  {id:11,cat:"STORY",title:"The Old Photographs",music:"Gentle nostalgic Indian melody — slow and slightly melancholic.",concept:"Finding photographs of yourself dancing as a child. Sitting with them. Not just nostalgia — reckoning.",dance:"End with you recreating a pose from one of the old photographs. Same pose. Different body.",outfit:"Home clothes — no staging. This is a quiet private moment.",location:"Wherever you found the photographs. Floor, bed, table.",hook:"Hands going through a box or album. A photograph of you dancing young. Text: 'She danced for 14 years before I stopped her.'",caption:"She is still in there. I am finding her again. 📷🤍"},
  {id:12,cat:"STORY",title:"My Sunday vs Theirs",music:"Two contrasting clips — casual weekend sounds, then suddenly classical practice music.",concept:"What your Sunday actually looks like vs what people your age around you are doing. Sacrifice framed as choice.",dance:"Show your actual Sunday rehearsal footage. Imperfect. Real.",outfit:"Practice clothes. Hair up. No glamour.",location:"Your practice space at home — messy, lived-in, real.",hook:"Text: 'Sunday, 9 AM.' Sequential: friends at brunch vs you mid-practice. Contrast lands without a word.",caption:"I chose this. Every Sunday. I would choose it again. 🌿"},
  {id:13,cat:"STORY",title:"Video Call Parents Mid-Practice",music:"Original audio of the video call — their voices, their excitement.",concept:"Your parents in India see you practicing through a phone screen. Their faces. 8,000 miles of love.",dance:"Do a short section of your practice piece directly for the phone camera — for them.",outfit:"Practice clothes. This is a rehearsal.",location:"Your practice space. Phone propped showing their faces.",hook:"Phone screen showing parents' video call faces. Text: 'They have not seen me dance in 12 years.' Then you begin moving.",caption:"My mother covered her mouth. My father just nodded slowly. That nod held everything. 📱🤍"},
  {id:14,cat:"STORY",title:"The American Colleague",music:"Contrast — office ambient sound, then classical performance music.",concept:"The moment a non-Indian American colleague watched you perform for the first time. Their reaction.",dance:"Footage of the performance they saw. Their face watching, if they agreed.",outfit:"Full performance costume.",location:"Wherever they saw you perform.",hook:"Text: 'My coworker watched me perform for the first time.' Their face. Then: 'She cried.'",caption:"Art does not need translation. It just needs a witness. 🎭"},
  {id:15,cat:"STORY",title:"Putting On the Costume",music:"No music. Original audio only — sound of each jewellery piece, clasps, fabric.",concept:"The ritual of becoming. The 45 minutes before a performance. Each piece has a name, a place, a history.",dance:"The getting-dressed process IS the dance.",outfit:"Every piece of the Kuchipudi classical costume — added on camera in sequence.",location:"Your dressing area — mirror, good lighting.",hook:"Hands picking up the first jewellery piece. Silence. Text: 'It takes 45 minutes to become her.'",caption:"The performance starts before the music. It starts here. 💎"},
  {id:16,cat:"STORY",title:"First Paycheck & Dance",music:"Upbeat but grounded — captures adulting and passion simultaneously.",concept:"The real financial calculation of pursuing art in America. What portion of a paycheck goes toward dance.",dance:"Brief moment of the dance that those hours of work are funding. Connect cost to art directly.",outfit:"Work clothes transitioning to practice clothes.",location:"Home office for paycheck. Practice space for dance.",hook:"Phone showing bank notification. Text: 'First paycheck. Dance class: paid. Costume repair: paid. Competition: paid.' Then you dancing.",caption:"The day job funds the dream job. I am at peace with this math. 💸🕊️"},
  {id:17,cat:"STORY",title:"Traffic Thoughts",music:"Your actual car audio. Or lo-fi with your voiceover.",concept:"The mental space of the drive to dance class. What actually runs through your mind.",dance:"Cut from the car to you arriving and beginning warm-up. The transition from driver to dancer.",outfit:"Work or casual clothes in the car. Practice clothes when you arrive.",location:"Your car, Dallas streets. Then your dance class.",hook:"Windshield view of Dallas roads. Your voice: 'Every week I drive 25 minutes to dance class. Here is what I think about the entire way.'",caption:"The drive there is its own kind of practice. 🚗🎵"},
  {id:18,cat:"STORY",title:"The Text From Guru",music:"Warm quiet — like relief.",concept:"The specific message your guru sent after an unexpectedly good practice. After weeks of doubt.",dance:"The section of the piece she was complimenting — at your best.",outfit:"Current clothes for reaction. Practice clothes in flashback.",location:"Wherever you received the message.",hook:"Your phone screen. A message from your guru. Text: 'I have been waiting 6 months for a message like this.'",caption:"Some days your guru sees what you cannot yet see in yourself. Hold onto those days. 🙏"},
  {id:19,cat:"STORY",title:"The Home Practice Space",music:"Silence during the 'before' reveal. Then your practice music.",concept:"The day you designated a corner of your home specifically for dance. The before and after.",dance:"The first sequence you dance in the newly set up space.",outfit:"Home clothes for setup. Practice clothes when you dance.",location:"The corner or room that is now your practice space.",hook:"An empty corner of your home. Then you placing a mat, mirror, ankle bells. Text: 'I made space for her to come home.'",caption:"You have to make physical space for the things you love before they believe you mean it. 🏠✨"},
  {id:20,cat:"STORY",title:"Calling My First Teacher",music:"Original audio of the phone call. Otherwise quiet emotional instrumental.",concept:"The conversation with the teacher who first taught you Kuchipudi — telling her you came back.",dance:"Film the piece you learned from her. A tribute within the reel.",outfit:"Practice clothes.",location:"Wherever you made the call. Then your practice space.",hook:"Phone in hand. Text: 'I called the woman who first put ankle bells on my feet.' Then: 'I told her I came back.'",caption:"She said: 'I know. Your hands always remembered.' 📞🌸"},
  {id:21,cat:"STORY",title:"Hands Before and After",music:"Silence during the before shot. Practice music during the after.",concept:"The physical evidence of a 2-hour rehearsal on your hands. Where Kuchipudi lives on a dancer's body.",dance:"Show the hands in motion mid-practice — the same hands doing the mudras.",outfit:"Practice clothes.",location:"Practice space — neutral background so hands are the focus.",hook:"Close-up of your hands — clean, resting. Text: 'Before.' Then two hours of practice. Text: 'After.'",caption:"These hands have 500 performances in them. They are remembering. 🤲"},
  {id:22,cat:"STORY",title:"The Age-8 Video",music:"Audio from the old video itself. Gentle present-day classical music underneath.",concept:"Watching yourself dance at 8 years old in real time. Your actual unperformed reaction.",dance:"Recreate the same pose from the old video — your body now vs then.",outfit:"Whatever you wear when watching. Then costume matching the pose recreated.",location:"Wherever you watch the old footage. Then practice space.",hook:"An old grainy video of a child dancing Kuchipudi. Text: 'This is me at 8.' Your face watching it. 'I stopped when I was 22.' Silence.",caption:"She never stopped believing I would come back. I owed her this. 🎞️"},
  {id:23,cat:"STORY",title:"The WhatsApp Group",music:"WhatsApp notification sounds as texts come in — that IS the audio.",concept:"Your family's WhatsApp group on competition day. Messages, voice notes, prayers from India.",dance:"Performance footage from the competition.",outfit:"Competition costume.",location:"Phone screen with messages. Then competition footage.",hook:"Phone screen — WhatsApp group. Messages pouring in. Crying emoji. Text: 'My family in India was watching from 8,000 miles away.'",caption:"They prayed, they refreshed, they stayed up late in India to know. 🙏🌏"},
  {id:24,cat:"STORY",title:"Performance Day Smells",music:"Ambient home sounds only — the smell is the concept.",concept:"The specific sensory experience of a performance day. Incense, flowers, specific food. Memory is stored in smell.",dance:"Hands lighting incense. Placing flowers. The beginning of becoming.",outfit:"Early stages of costume — mid-transformation.",location:"Your home, your mirror, your performance day routine.",hook:"Hands lighting an agarbatti. Smoke rising. Text: 'There is a specific smell to performance days.'",caption:"My body knows performance day before my mind does. 🪔🌸"},
  {id:25,cat:"STORY",title:"The Pre-Performance Puja",music:"Original audio — bells, Sanskrit words if spoken, the quiet of ritual.",concept:"The ritual you do before every performance. The prayer, the intention, the connection to something larger.",dance:"The first movement after the puja is complete.",outfit:"Partially in costume.",location:"Your home puja space or altar.",hook:"Hands in prayer in front of a small altar. No text. Just sound. Then: text explaining what is happening.",caption:"I do not perform alone. I never have. 🙏🪔"},
  {id:26,cat:"STORY",title:"Guru's Correction on Herself",music:"Classical practice music — the actual piece you are working on.",concept:"The moment your guru demonstrates a correction on her own body. The beauty of what she shows you. The gap.",dance:"Her demonstration. Then your attempt. Both shown. No dishonesty about the gap.",outfit:"Practice clothes for both.",location:"Her dance studio.",hook:"Your guru in motion — demonstrating. Text: 'She showed me what it should look like.' Then you attempting it.",caption:"A guru shows you the mountain. You have to climb it yourself. 🏔️"},
  {id:27,cat:"STORY",title:"Posting the First Reel",music:"Silence for posting. Then audio of whichever first reel it was.",concept:"The specific anxiety of posting your first dance Reel. What you thought would happen. What actually happened.",dance:"Whatever was in that first Reel — clips from it.",outfit:"Whatever you were wearing when you posted it.",location:"Wherever you were — bed, couch, car.",hook:"Phone screen showing Instagram post button. Your finger hovering. Text: 'I almost did not post it.'",caption:"The first one is always the hardest. Post it anyway. 📱"},
  {id:28,cat:"STORY",title:"When 560K People Watched",music:"Audio from the viral reel itself.",concept:"The moment you realised 560,000 people had watched you dance. Where you were. What you felt.",dance:"Clips from the viral reel — the performance, the husband crying, the in-laws.",outfit:"Whatever you were wearing when you saw the notification.",location:"Wherever you were — be specific.",hook:"Phone screen showing 560,000 views. Your face seeing it. Text: 'I was in the middle of making chai.'",caption:"560,000 people watched a moment I almost did not share. Post the real things. 📲"},
  {id:29,cat:"STORY",title:"The Only One My Age",music:"A gentle, slightly lonely instrumental.",concept:"Being the only person your age in your dance class. The isolation of loving something almost nobody at 24 shares.",dance:"Film your actual class — the age dynamic visible in the room.",outfit:"Practice clothes.",location:"Your dance studio during class.",hook:"Wide shot of the dance class. Text: 'I am 24.' Then: 'I am the only one in my class my age.'",caption:"The loneliness of loving something specific. And then the quiet acceptance that the art does not require company. 🌿"},
  {id:30,cat:"STORY",title:"Same Road, Different Person",music:"Two different pieces — heavy for bad class, lighter for good.",concept:"The drive home from class is the same road every time. The difference is entirely interior.",dance:"Brief flashback cuts to the class itself — when things went wrong, or clicked.",outfit:"Practice clothes — post-class, driving home.",location:"Your car. Dallas roads at night.",hook:"Dashboard view. Text: 'Same drive home. Same road. Completely different person depending on how class went.'",caption:"The road does not change. You do. Over and over. 🛣️"},

  // ART 31-55
  {id:31,cat:"ART",title:"Wrong vs Right Mudra",music:"Clean classical instrumental — serious Kuchipudi class.",concept:"Show the difference between an incorrect and correct mudra in slow motion. Give the audience the ability to see what you see.",dance:"One mudra performed incorrectly (your actual common error), then correctly. Both in slow motion.",outfit:"Practice clothes or performance costume — shows arm lines clearly. No baggy sleeves.",location:"Clean background — plain wall behind you.",hook:"Close-up on hands. Text: 'Spot the difference.' Wrong mudra in slow motion. Then right.",caption:"Years of training live in millimetres. 🤲 #Kuchipudi #ClassicalDance"},
  {id:32,cat:"ART",title:"5 Foundational Footwork Patterns",music:"Crisp mridangam or tabla percussion. Classical rhythm, no melody overlay.",concept:"The foundational vocabulary of Kuchipudi footwork. 5 patterns, 6 seconds each.",dance:"Tattu adavu and variations — clear, precise, medium pace. Each labelled on screen.",outfit:"Practice clothes allowing ankles to be visible. Ankle bells essential.",location:"Hard floor. Camera angled to capture feet clearly.",hook:"Close-up of feet on floor. Ankle bells visible. Text: 'Kuchipudi has an entire language in the feet. 5 patterns. Watch.'",caption:"The feet carry 2000 years of conversation. 👣 #KuchipudiFootwork"},
  {id:33,cat:"ART",title:"Nataraja — 3 Angles",music:"Slow, reverent classical piece.",concept:"The Nataraja pose seen from three different angles reveals three completely different stories.",dance:"Full Nataraja pose held — front, side, 45 degrees. Each held for 5 seconds.",outfit:"Full performance costume — the visual line needs the full silhouette.",location:"Clean background. Strong directional lighting.",hook:"Front angle, full Nataraja pose, perfectly still. Text: 'You have seen this pose. Now see what it actually looks like.'",caption:"The Nataraja pose is not a frozen moment. It is a conversation between balance and flight. 🌀"},
  {id:34,cat:"ART",title:"Abhinaya — 5 Takes",music:"Same musical phrase playing underneath all 5 takes.",concept:"One specific emotion shown through abhinaya five times — each take deeper. Abhinaya is excavation.",dance:"Face and upper body only. Five takes of the same 8-second abhinaya sequence.",outfit:"Costume or practice clothes with clean neckline.",location:"Controlled lighting. Dark or neutral background.",hook:"Your face in neutral. Text: 'Same emotion. 5 attempts. Watch what changes.' Then take 1 begins.",caption:"Abhinaya is not performed. It is arrived at. Take 5 is where I finally got there. 🎭"},
  {id:35,cat:"ART",title:"Hardest Sequence at 50% Speed",music:"Your actual competition piece audio slowed to 50%.",concept:"The hardest sequence in your competition piece shown at half speed so non-dancers can see what's happening.",dance:"That specific sequence. Filmed at normal speed but edited to 50% playback.",outfit:"Practice clothes or performance costume.",location:"Your practice space.",hook:"You mid-sequence, fast. Text: 'Slower.' The same sequence at 50% speed begins.",caption:"This took me 6 weeks. You get to see why. ⏱️"},
  {id:36,cat:"ART",title:"The Correction — Error Then Fix",music:"Your practice audio — class music, real and live.",concept:"The single correction your guru gives you most often. The error as it looks, then the correction.",dance:"Your actual recurring error. Then the corrected version. Both clear.",outfit:"Practice clothes.",location:"Your practice space or dance studio.",hook:"Text: 'My guru corrects this every single class.' Then you doing the error. Then the correction.",caption:"The thing she keeps fixing is the thing I keep reaching for. 🎯"},
  {id:37,cat:"ART",title:"Navarasas — All 9 Emotions",music:"Nine short clips of different classical compositions. Transition sharply between them.",concept:"The nine fundamental emotions of classical Indian art — shown through your face and body.",dance:"Nine abhinaya moments — Shringara, Hasya, Karuna, Raudra, Vira, Bhayanaka, Bibhatsa, Adbhuta, Shanta. Each 3 seconds.",outfit:"Full performance costume and makeup.",location:"Controlled lighting. Clean background.",hook:"Text on black: 'Classical Indian dance has 9 emotions. All 9. Watch.' Then your face — each in sequence.",caption:"The entire human emotional spectrum. Trained. Performed. Felt. 🎭 #Navarasas"},
  {id:38,cat:"ART",title:"Araimandi — 30 Seconds",music:"Silence. Only breath and ambient room. Let the physical effort speak.",concept:"Araimandi — the foundational half-sit — held for 30 seconds on camera. Show what it actually demands.",dance:"Enter araimandi. Hold. Camera slowly zooms in. At 30 seconds, rise.",outfit:"Practice clothes that allow legs and posture to be clearly visible.",location:"Your practice space. Plain background.",hook:"You entering araimandi. Text: 'This position is the foundation of everything I do. I will hold it for 30 seconds. Watch my face.'",caption:"Before the dance, there is this. There is always this. 🏛️"},
  {id:39,cat:"ART",title:"Sequence in Silence",music:"Complete silence. Only body sounds — ankle bells, footwork, breath, fabric.",concept:"A full sequence with no musical accompaniment. The structure of movement, the rhythm of footwork — exposed.",dance:"A full 30-45 second sequence. Unaccompanied. Body sounds heard clearly.",outfit:"Full performance costume — ankle bells essential.",location:"Hard floor for footwork resonance. Clean acoustic space.",hook:"You standing in position. Silence. Text: 'No music.' Then you begin.",caption:"Take the music away and the dance still speaks. That is how you know it is real. 🤫"},
  {id:40,cat:"ART",title:"Month 1 vs Month 6",music:"Same piece of music in both recordings — only the dancer changes.",concept:"The same 20-second section — recorded in month 1 and month 6. The difference is the story of return.",dance:"Identical section. Month 1 — honest, imperfect. Month 6 — what has been recovered.",outfit:"Same practice clothes in both — isolate the change.",location:"Same practice space, same angle.",hook:"Text: 'Month 1.' Footage plays. Text: 'Month 6.' Same section. Let the difference be the entire content.",caption:"I did not know what 6 months of coming back would look like. Now I do. 📅"},
  {id:41,cat:"ART",title:"The Ankle Position",music:"Crisp percussion — makes footwork sound intentional and powerful.",concept:"The specific ankle position and foot placement that creates the characteristic Kuchipudi footwork sound.",dance:"Extreme close-up of your ankle and foot. Then the footwork pattern.",outfit:"Ankle bells clearly visible.",location:"Hard floor. Camera very close to floor.",hook:"Extreme close-up of ankle on floor. Text: 'This is what makes that sound.' Then footwork begins.",caption:"Every sound is a choice. Every placement is trained. Nothing is accidental. 👁️"},
  {id:42,cat:"ART",title:"Character Transition",music:"Two contrasting musical themes — one for each character.",concept:"The moment in a piece where you shift from one character to another. The transformation happens in real time.",dance:"Character A — full expression. Transition in slow motion. Then Character B.",outfit:"Performance costume that works for both characters.",location:"Performance space or clean studio background.",hook:"You fully embodied as Character A. Text: 'Watch what happens in 3 seconds.' The transition. Then Character B.",caption:"This is what 20 years of training makes possible. One body. Multiple truths. 🎭"},
  {id:43,cat:"ART",title:"Eyes Closed vs Eyes Open",music:"Same piece, same section, played twice.",concept:"The same sequence performed twice — eyes closed, then eyes open with full abhinaya. The eyes are the soul.",dance:"Identical sequence. Version 1: eyes closed. Version 2: eyes open with full expression.",outfit:"Performance costume.",location:"Good lighting on the face. Clean background.",hook:"Version 1 begins — eyes closed, technically accurate. Text: 'Now open.' Eyes open. The abhinaya activates.",caption:"The difference between a dancer and a performance lives in the eyes. 👁️"},
  {id:44,cat:"ART",title:"Rehearsal Energy vs Performance Energy",music:"Same piece. Rehearsal footage energy is different — you can hear it.",concept:"The same piece. Two completely different energies — the working rehearsal vs full performance commitment.",dance:"Rehearsal clips — stop, correct, restart. Then performance version — full flow.",outfit:"Practice clothes in rehearsal. Performance costume in performance footage.",location:"Practice space for rehearsal. Stage for second half.",hook:"Rehearsal footage — you stopping mid-sequence. Text: 'This is practice.' Then performance. Text: 'This is what practice becomes.'",caption:"What the audience sees is the smallest part of what a dancer does. 🎬"},
  {id:45,cat:"ART",title:"Hands, Wrists, Forearms Only",music:"Slow, lyrical classical instrumental — makes arm movement feel like liquid.",concept:"An entire reel that never leaves the arms. Grammar of classical dance from elbow to fingertip.",dance:"Only arm and hand movement. Smooth, continuous, unhurried.",outfit:"Costume that exposes forearm and wrist. Jewellery on wrists.",location:"Dark background. Warm directional lighting on the arms.",hook:"Extreme close-up on one hand in a mudra — still. Then slow movement begins.",caption:"The hands speak first. The rest of the body follows. 🤲"},
  {id:46,cat:"ART",title:"Tarangam — Slow Reveal",music:"Original audio — the actual classical tarangam composition. Own it completely.",concept:"Tarangam performed with a slow camera reveal — starting at feet on plate and slowly pulling back.",dance:"Full tarangam sequence — performed at your best. Uncut.",outfit:"Full classical performance costume.",location:"Performance space. Hard floor, brass plate.",hook:"Tight shot of feet on brass plate. Sound of plate resonating. Text: 'She is dancing on a brass plate.' Camera slowly pulls back.",caption:"Tarangam. 2000 years old. Performed in Texas. The art does not care about geography. 🥁"},
  {id:47,cat:"ART",title:"One Mudra, Then Movement",music:"Absolute silence for the hold. Then music enters exactly when the mudra breaks.",concept:"The power of stillness before movement. One mudra, perfectly held for 5 seconds.",dance:"Your most beautiful mudra. Hold absolutely still. Then release into natural movement.",outfit:"Performance costume.",location:"Clean, well-lit space.",hook:"Your hands arrive in a mudra. Complete stillness. Silence. 5 full seconds. Then music begins and movement flows.",caption:"Stillness is not the absence of dance. It is the preparation. ✋"},
  {id:48,cat:"ART",title:"The Makeup Transformation",music:"Gradual build — ambient home sounds, ending with full classical performance piece.",concept:"The full classical Kuchipudi stage makeup transformation from bare face to complete.",dance:"The makeup itself is the performance. The hands applying, the face changing.",outfit:"Transformation from casual clothes into performance sari alongside makeup.",location:"Your mirror. Good lighting. Real process.",hook:"Your bare face. One quiet moment. Then first stroke of foundation. Text: 'It takes 45 minutes. Watch.'",caption:"This face has performed for 500 audiences. Let me show you how she gets ready. 💄🌸"},
  {id:49,cat:"ART",title:"Monthly Progress — Same Piece",music:"Same piece of music across all months.",concept:"The same 20-second section filmed every week for a month. Invisible progress made visible.",dance:"Identical section each week. Camera angle identical.",outfit:"Same practice clothes each week.",location:"Same spot, same angle every week.",hook:"Text: 'I filmed the same 20 seconds every week for a month.' Week 1. Week 2. Week 3. Week 4.",caption:"Progress does not announce itself. You have to be looking. 📆"},
  {id:50,cat:"ART",title:"Weakest vs Strongest Expression",music:"Same music section, played twice.",concept:"Total honesty. Your weakest expressive moment vs your strongest. The range within the same body.",dance:"The section where your abhinaya is weakest — shown first. Then where it is strongest.",outfit:"Performance costume or consistent practice clothes.",location:"Good facial lighting.",hook:"Text: 'This is my weakest expression in my piece.' It plays. Then: 'This is my strongest.' It plays.",caption:"A dancer who knows her weaknesses is already working on them. 🎭"},
  {id:51,cat:"ART",title:"Feet After Practice",music:"Silence, or sound of running water as you tend to your feet.",concept:"What two hours of classical dance practice looks like on your feet. Not glamorous.",dance:"No dance. Just the feet. Before practice — clean. After practice — the honest truth.",outfit:"Whatever you wear after practice.",location:"Bathroom floor, or wherever you sit after class.",hook:"Close-up of your feet before practice. Then after practice. The difference is the content.",caption:"Nobody sees this part of being a dancer. Now you do. 👣"},
  {id:52,cat:"ART",title:"Anklets to Crown — The Pan",music:"Slow, rising classical composition — builds as camera rises.",concept:"A slow upward camera pan from ankle bells to crown — revealing the complete costume from ground up.",dance:"Stand completely still in full costume. The camera does the moving.",outfit:"Full classical Kuchipudi performance costume — every piece, complete.",location:"Clean background. Full-length shot possible. Good even lighting.",hook:"Camera begins at ankle bells — the sound of them ringing once. Then the pan upward. No text until the reveal.",caption:"2000 years of tradition. Worn once by one dancer. Each time as if for the first time. 💫"},
  {id:53,cat:"ART",title:"When No One Is Watching",music:"Whatever you actually listen to when you practice alone — be honest.",concept:"The difference between your movement quality when you think no one is watching vs when the camera is rolling.",dance:"Candid practice footage — genuinely not performing for camera. Then camera-aware version.",outfit:"Whatever you actually wear alone at home during practice.",location:"Your home practice space as it actually is — not staged.",hook:"Candid shot — you at home, hair undone. Text: 'This is what practice looks like when no one is watching.'",caption:"The gap between these two versions is where all the work lives. 📹"},
  {id:54,cat:"ART",title:"One Minute of Pure Nritta",music:"Crisp, fast classical percussion. No vocal.",concept:"One full minute of nritta — pure abstract dance with no narrative, no character.",dance:"One minute of your strongest nritta sequences — continuous, no breaks, full energy.",outfit:"Full performance costume.",location:"Stage or clean studio space with room to move.",hook:"You take position. Music begins. Text: '60 seconds. No story. Just this.' Then one full uninterrupted minute.",caption:"Before there was story, there was rhythm. The oldest conversation. ⚡"},
  {id:55,cat:"ART",title:"Competition Piece — Full Take",music:"Your actual competition piece audio — original, unedited, full.",concept:"Your complete competition piece. One full, uncut take. The piece you have trained for months.",dance:"Your entire competition piece from beginning to end. Best take. Full performance energy. Uncut.",outfit:"Full competition costume.",location:"Wherever you have space. Stage if possible.",hook:"You standing in opening position. Stillness. Music begins. Text: 'This is what I have been training for.'",caption:"Finals are coming. This is the work. 🏆"},

  // CONTEXT 56-80
  {id:56,cat:"CONTEXT",title:"Why Kuchipudi Is From Andhra Pradesh",music:"Gentle Telugu classical — authentic, not Bollywood.",concept:"The origin story of Kuchipudi — the village, the Brahmin dancers, the Krishna plays. Made accessible.",dance:"One traditional opening movement or invocation as a visual anchor.",outfit:"Full performance costume.",location:"Practice space with clean backdrop.",hook:"Text: 'There is a village in Andhra Pradesh, India. Everyone in it used to be a dancer.' Then the story begins.",caption:"The art has a home. Its name is Kuchipudi. 🗺️ #KuchipudiHistory"},
  {id:57,cat:"CONTEXT",title:"What the Flowers in My Hair Mean",music:"Gentle, devotional classical.",concept:"Each flower in a classical dancer's hair has a specific meaning — not decoration.",dance:"Show the flowers in your hair, then one movement connecting to what they represent.",outfit:"Full performance costume with traditional flower arrangement.",location:"Your mirror — flowers up close, then full look.",hook:"Close-up of flowers in your hair. Text: 'People always ask about the flowers. There is an answer.'",caption:"Every element of a classical dancer's appearance is a vocabulary. Nothing is random. 🌸"},
  {id:58,cat:"CONTEXT",title:"Why the Costume Colours Are Specific",music:"Devotional classical — sounds like a temple.",concept:"The symbolic meaning of classical costume colours in Kuchipudi — green, gold, red, and why.",dance:"Show each element of the costume as you describe it.",outfit:"Full Kuchipudi performance costume.",location:"Well-lit space where colours are clearly visible.",hook:"Show your full costume. Text: 'People think this is just beautiful. It is also a language.'",caption:"A Kuchipudi costume is not chosen. It is inherited. Every colour has a reason. 🎨"},
  {id:59,cat:"CONTEXT",title:"My Guru's Lineage",music:"Quiet, reverent classical — honouring elders.",concept:"Trace your teaching lineage as far back as you can. Your guru, her guru, her guru's guru.",dance:"The opening invocation or vandana of your tradition.",outfit:"Full performance costume.",location:"Your practice space or a quiet respectful space.",hook:"Text: 'Before I dance, I owe you some names.' Your name. Arrow. Your guru. Arrow. Her guru. Arrow. Further back.",caption:"I am not just one dancer. I am the latest in a very long line. 🙏"},
  {id:60,cat:"CONTEXT",title:"Why The Head Tilts",music:"Classical piece that uses the head movement being described.",concept:"The specific, trained head tilt — not an affectation, not decoration. It has a name, a function, is trained separately.",dance:"Demonstrate each head movement — named, labelled, performed clearly. Then in context.",outfit:"Costume or practice clothes with clean neckline.",location:"Good lighting on the neck and head.",hook:"Text: 'People always ask: why does she tilt her head like that?' Then: 'Here is the actual answer.'",caption:"Every tilt has a name. Every name has a purpose. 💡"},
  {id:61,cat:"CONTEXT",title:"The Story of the Kuchipudi Village",music:"Traditional Telugu folk and classical blend.",concept:"The literal village of Kuchipudi in Krishna district — how an entire community was structured around this art.",dance:"The piece most closely associated with the village tradition.",outfit:"Full traditional performance costume.",location:"Practice space with clean backdrop.",hook:"Text: 'There is a village where every family is a dance family. Has been for 300 years.'",caption:"The art is named after its home. The home is still there. 🏡"},
  {id:62,cat:"CONTEXT",title:"What the Brass Plate Means",music:"The actual tarangam composition — original audio only.",concept:"The brass plate in tarangam is not a prop. It represents the lotus — Lakshmi's seat.",dance:"Tarangam — feet on the brass plate. Show the relationship deliberately.",outfit:"Full classical performance costume.",location:"The plate on the floor of your performance space.",hook:"Close-up of the brass plate. Text: 'This is not a prop.' Then explain what it represents.",caption:"Every prop in classical dance is sacred. None of it is decoration. 🌺"},
  {id:63,cat:"CONTEXT",title:"Why Classical Dance Has a Devotional Element",music:"A classical devotional composition — Krishna bhajans or stotras.",concept:"Why Indian classical dance was historically performed in temples. What it means to dedicate movement to something beyond the dancer.",dance:"A devotional sequence — performed with genuine bhakti intention.",outfit:"Full performance costume.",location:"Near your home altar or puja space.",hook:"You in prayer position before beginning. Text: 'People ask why classical Indian dance is always about gods.' Then: 'Here is why.'",caption:"The dance was always an offering. It still is. Even on Instagram. 🪷"},
  {id:64,cat:"CONTEXT",title:"Is This Bharatanatyam?",music:"Play both a Bharatanatyam and Kuchipudi composition back to back.",concept:"The definitive answer to the question every non-Indian asks. Show the specific differences.",dance:"The same musical concept approached differently in both styles. Generous and respectful.",outfit:"Kuchipudi performance costume.",location:"Your practice space.",hook:"Text: 'If you have ever asked me if this is Bharatanatyam...' Then: 'Here is the real answer.'",caption:"Two different arts. Two different histories. Both extraordinary. 💫"},
  {id:65,cat:"CONTEXT",title:"The 3 Essential Elements",music:"Three distinct classical pieces — one demonstrating each element.",concept:"Every Kuchipudi performance must contain nritta, nritya, and natya. Remove one and it is not Kuchipudi.",dance:"Short demonstration of each — nritta (pure rhythmic), nritya (expressive), natya (dramatic).",outfit:"Performance costume.",location:"Practice or performance space.",hook:"Text: 'Kuchipudi has 3 non-negotiable elements. Remove one and it is not Kuchipudi anymore.'",caption:"The form has rules. The rules have reasons. The reasons are 2000 years old. 📐"},
  {id:66,cat:"CONTEXT",title:"Translating the Sanskrit",music:"The actual composition being translated — playing as you explain.",concept:"Take one Sanskrit shloka from your piece and translate it word by word into movement.",dance:"Each word connected to the corresponding mudra or movement.",outfit:"Performance costume or practice clothes.",location:"Your practice space.",hook:"The music plays. One line of Sanskrit appears. Text: 'This line. Word by word. Let me show you what it means.'",caption:"Every lyric is a stage direction. Every word is a mudra. 📖"},
  {id:67,cat:"CONTEXT",title:"Why Kuchipudi and Krishna",music:"A devotional Krishna composition — Dashavatara or traditional Krishna keertana.",concept:"The specific historical and mythological connection between Kuchipudi and Lord Krishna.",dance:"A Krishna-themed piece — performed with devotional intention.",outfit:"Full performance costume.",location:"Your practice space.",hook:"Text: 'Almost every Kuchipudi piece I perform is about Lord Krishna. This is not a coincidence.'",caption:"The art was born from devotion. Specifically his. 🦚"},
  {id:68,cat:"CONTEXT",title:"What the Dots on My Forehead Mean",music:"Quiet devotional.",concept:"Each specific marking on the classical dancer's face — the bindi, the tilak — has a specific meaning.",dance:"Close-up of your face in full makeup — then one expressive movement.",outfit:"Full classical makeup and face decoration.",location:"Close-up at mirror. Good facial lighting.",hook:"Close-up of your face in full makeup. Text: 'Every mark on my face means something specific.'",caption:"A classical dancer's face is a text. I am happy to translate it for you. 🔴"},
  {id:69,cat:"CONTEXT",title:"Why Eyes Are Trained Separately",music:"Slow classical piece that requires heavy abhinaya.",concept:"In Kuchipudi training, eye movements are a separate discipline. Eight defined movements — each with a name.",dance:"Demonstrate each defined eye movement — labelled. Then in context.",outfit:"Full makeup and costume.",location:"Good frontal lighting on face.",hook:"Extreme close-up of your eyes. Text: 'These are trained. Separately. Specifically. For years. Eight movements.'",caption:"The eyes do not react. They perform. That is the difference. 👁️"},
  {id:70,cat:"CONTEXT",title:"What 2000 Years Actually Means",music:"The oldest style of classical composition you perform.",concept:"Make 2000 years concrete. What was happening in the world in 100 AD? Make the timeline tangible.",dance:"The most traditional, unchanged movement in your repertoire.",outfit:"Full classical costume.",location:"Clean, respectful backdrop.",hook:"Text: 'This dance is 2000 years old.' Then: 'That means it existed when...' [concrete historical reference].",caption:"Some things survive everything. This is one of them. 🏛️"},
  {id:71,cat:"CONTEXT",title:"My Coworker Describes What They Saw",music:"Contrast — office ambient sounds, then classical music.",concept:"Ask an American coworker to describe your dance in their own words — without any Indian dance vocabulary.",dance:"The piece they watched — clips — alongside their description.",outfit:"Performance costume in clips. Casual clothes for conversation.",location:"Office or casual setting. Performance space for dance clips.",hook:"Text: 'I showed my coworker my dance performance.' Then their description in their own words.",caption:"Seeing your art through someone else's eyes for the first time is its own kind of gift. 🤍"},
  {id:72,cat:"CONTEXT",title:"What a Gurukul System Is",music:"Classical practice music — sound of learning.",concept:"The traditional gurukul system — living with the teacher, learning holistically, the guru-shishya relationship.",dance:"You in class with your guru — the relationship visible in how you learn.",outfit:"Practice clothes.",location:"Your guru's dance studio.",hook:"Text: 'In classical Indian arts, the teacher-student relationship is called Guru-Shishya Parampara.'",caption:"I do not just take dance lessons. I belong to a lineage. There is a difference. 🙏"},
  {id:73,cat:"CONTEXT",title:"How Classical Dance Survived Colonisation",music:"A piece from the post-Independence classical dance renaissance.",concept:"British colonial rule declared classical Indian dance immoral. How the art survived, went underground, and was revived.",dance:"The most traditional piece in your repertoire.",outfit:"Full traditional performance costume.",location:"Your practice space.",hook:"Text: 'The British declared this art form immoral and tried to erase it.' Pause. 'They did not succeed.'",caption:"Every time I perform, I am performing an act of survival. 🌿"},
  {id:74,cat:"CONTEXT",title:"What the Word Kuchipudi Means",music:"Traditional Telugu folk music.",concept:"The word 'Kuchipudi' comes from 'Kuchinapudi' — the village name. Break down the etymology.",dance:"An invocation or traditional opening piece.",outfit:"Full performance costume.",location:"Practice space.",hook:"Text: 'Kuchipudi. Most people cannot spell it. Nobody knows what the word actually means.'",caption:"The name of the art is the name of its birthplace. Every performance is a homecoming. 🏠"},
  {id:75,cat:"CONTEXT",title:"Nritta vs Nritya vs Natya",music:"Three distinct pieces — one per element.",concept:"The three distinct modes of classical Indian dance — shown, not explained.",dance:"Nritta: fast, abstract footwork. Nritya: expressive, slow. Natya: dramatic, character-based. Each 10 seconds.",outfit:"Performance costume.",location:"Your practice space.",hook:"Text: 'Classical Indian dance is actually three different things at once. Watch.' Then demonstrate each.",caption:"One art form. Three modes. Each requires completely different training. 📚"},
  {id:76,cat:"CONTEXT",title:"Teaching Abhinaya in Real Time",music:"A bhava-heavy classical composition.",concept:"Teach the concept of abhinaya through your own face in real time. Start with neutral. Build step by step.",dance:"Build one specific abhinaya sequence in real time — from neutral through each layer.",outfit:"Full makeup and costume.",location:"Good frontal lighting on face.",hook:"Your face completely neutral. Text: 'I am going to teach you what abhinaya is by doing it in front of you right now.'",caption:"You cannot learn abhinaya from a book. But you can watch it being built. 🎭"},
  {id:77,cat:"CONTEXT",title:"Why the Margam Order Is Fixed",music:"Transition through classical pieces — each representing a different margam item.",concept:"A classical Kuchipudi margam follows a specific fixed order — alarippu, jatiswaram, sabdam, varnam, padam, tillana.",dance:"Brief demonstration of each item in the margam.",outfit:"Performance costume.",location:"Practice space.",hook:"Text: 'A Kuchipudi concert has a specific order. You cannot rearrange it.' Then: 'Here is why the order is the art.'",caption:"The architecture of a classical concert is as intentional as the dance itself. 🏛️"},
  {id:78,cat:"CONTEXT",title:"Temple vs Stage Performance",music:"Temple setting piece vs elaborate stage composition.",concept:"Classical Kuchipudi was originally performed only in temples — for the deity. How the shift to stage changed the art.",dance:"The same piece in two modes — devotional/temple vs stage performance energy.",outfit:"Full performance costume.",location:"Near home altar for temple mode. Practice space for stage mode.",hook:"Text: 'For 300 years, this was only performed for gods.' Then: 'Then it moved to stages.'",caption:"I perform for audiences. But I trained to perform for something else. Both are true. 🕌"},
  {id:79,cat:"CONTEXT",title:"How Ankle Bells Are Tied",music:"The sounds of the ankle bells themselves — before any music.",concept:"The specific process of tying ghungroo — the number of bells, the placement, why they are tied the way they are.",dance:"The first footwork pattern after bells are properly tied — let the sound be the reveal.",outfit:"Practice clothes allowing ankles to be clearly visible.",location:"Seated on practice floor, then standing.",hook:"Your hands picking up the ankle bells. Text: 'Every dancer ties these differently. Here is how I do it. And why the count matters.'",caption:"Before the first note of music, there is this. There is always this. 🔔"},
  {id:80,cat:"CONTEXT",title:"Sanskrit Into Movement — 60 Seconds",music:"The actual composition being interpreted — text and music align.",concept:"Take 60 seconds of one classical composition and translate it word by word into movement.",dance:"Each Sanskrit phrase connected to its exact corresponding mudra or movement.",outfit:"Performance costume or practice clothes.",location:"Practice space.",hook:"The music begins. One line of Sanskrit appears. Text: 'Each word is a movement. Watch.'",caption:"Sanskrit is not a dead language. It is dancing in front of you. 📜"},

  // DOUBT 81-100
  {id:81,cat:"DOUBT",title:"Things I Believed That Were Wrong",music:"Quiet, slightly ironic acoustic — carries self-awareness.",concept:"A list of specific things you believed about returning after 12 years that turned out to be completely wrong.",dance:"Brief clips of actual practice — the honest version, not the Instagram version.",outfit:"Practice clothes.",location:"Home practice space.",hook:"Text: 'Things I believed about coming back to dance after 12 years.' Then: 'I was wrong about all of them.'",caption:"The comeback I imagined and the comeback I am living are two completely different stories. 📋"},
  {id:82,cat:"DOUBT",title:"The Correction I Keep Getting",music:"Practice audio — class music, real.",concept:"The specific correction your guru gives you most often. What your body resists.",dance:"The movement being corrected — the error, the correction, and the gap shown honestly.",outfit:"Practice clothes.",location:"Dance class or home practice space.",hook:"Text: 'My guru has said this exact thing to me every single class for 6 months.'",caption:"Understanding the correction and embodying the correction are two completely different things. 🎯"},
  {id:83,cat:"DOUBT",title:"Rating My Own Practice",music:"Neutral background — this is a review, not a performance.",concept:"Give yourself an honest 1-10 rating for each practice session this week.",dance:"Clips from each practice corresponding to each rating.",outfit:"Practice clothes.",location:"Your practice space.",hook:"Text: 'I am rating my own practice sessions this week. Honestly.' Monday: [clip]. Rating. Tuesday: [clip].",caption:"The honest number is not the Instagram number. That is the whole point. 📊"},
  {id:84,cat:"DOUBT",title:"What Muscle Memory Actually Means",music:"Slow, thoughtful instrumental.",concept:"The real meaning of muscle memory when you have been away 12 years. What the body retains, what it loses.",dance:"A sequence where muscle memory is visible — and one where it clearly has not returned.",outfit:"Practice clothes.",location:"Your practice space.",hook:"Text: 'People said: the body remembers. I believed them.' Then: 'Here is the part they did not tell me.'",caption:"The body remembers. Just not everything. Not all at once. Not on your schedule. 🧠"},
  {id:85,cat:"DOUBT",title:"The Day I Decided to Compete",music:"Building classical composition — feels like a decision being made.",concept:"The specific moment you decided competing was worth the risk of public failure after 12 years away.",dance:"Your competition piece — because that is what the decision became.",outfit:"Practice clothes.",location:"Wherever you were when you made the decision.",hook:"Text: 'There was a moment when I stopped thinking about competing and started registering.'",caption:"The decision was not brave. It was just more afraid of not trying than of failing. 🎯"},
  {id:86,cat:"DOUBT",title:"What I'd Say to Myself at 22",music:"Gentle, warm piece — sounds like a letter.",concept:"A direct address to the 22-year-old version of yourself who stopped dancing.",dance:"Slow, personal movement at the end — movement as yourself, not as a performer.",outfit:"Home clothes. This is intimate.",location:"A quiet private space in your home.",hook:"Text: 'To the 22-year-old who put the ankle bells away for the last time.'",caption:"I cannot change what she did. I can make it worth it. 💌"},
  {id:87,cat:"DOUBT",title:"Comeback In Numbers",music:"Simple, steady beat — like a heartbeat counting.",concept:"The comeback rendered in specific, honest numbers. Months returned. Classes attended. Hours practiced. Times cried.",dance:"Montage of practice clips — one per significant number.",outfit:"Various practice outfits showing the span of time.",location:"Practice space across different months.",hook:"Text: 'My comeback. In numbers.' Then: '8 months.' '64 classes.' '200+ hours.' 'Times I stopped: 0.'",caption:"The numbers are not impressive. They are just honest. And honesty is the whole point. 📊"},
  {id:88,cat:"DOUBT",title:"The Body Part That Gave Out First",music:"Slow, slightly tense instrumental — not dramatic, just real.",concept:"The specific part of your body that failed first when you returned. What it felt like, where it is now.",dance:"Show that part of the body in motion — then and now.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'The first thing that gave out when I came back.' Then name it. Show what that looked like. Then where it is now.",caption:"The body keeps an honest record of time. It does not lie. 💪"},
  {id:89,cat:"DOUBT",title:"The Week I Almost Stopped",music:"Quiet, slightly heavy — sound of someone sitting with a hard decision.",concept:"The specific week during your comeback when you genuinely considered stopping again.",dance:"Brief clips from that week's practice — the lowest quality footage.",outfit:"Practice clothes from that period.",location:"Wherever you usually process things.",hook:"Text: 'There was a week when I seriously thought about stopping the comeback.'",caption:"I did not stay because I was strong. I stayed because stopping felt worse than continuing. 🌿"},
  {id:90,cat:"DOUBT",title:"Progress When It Is Invisible",music:"Quiet, introspective piece — does not resolve cleanly.",concept:"The experience of making progress that nobody can see yet — including yourself.",dance:"Consistent footage across multiple sessions — where the change is subtle.",outfit:"Consistent practice clothes.",location:"Practice space.",hook:"Text: 'I am improving. I think. I cannot always see it.' Then: 'This is what invisible progress looks like.'",caption:"Progress is not always visible. It is always happening. Trust the work. 🌱"},
  {id:91,cat:"DOUBT",title:"Month 1 Mindset vs Now",music:"Two contrasting pieces — one uncertain, one more grounded.",concept:"Compare what was running through your mind in month 1 vs now. Same practice. Different internal voice.",dance:"Month 1 footage vs current footage — same piece, showing how internal state affects movement.",outfit:"Consistent practice clothes.",location:"Same practice space, same angle.",hook:"Text: 'Month 1, the voice in my head said:' [specific thought]. 'Now it says:' [specific thought].",caption:"The dance is the same. The person doing it is not. That is what 8 months looks like. 🔄"},
  {id:92,cat:"DOUBT",title:"Proving Something vs Needing To",music:"Two emotional textures — proving has a harder edge, needing has a warmer core.",concept:"The difference between dancing to prove something and dancing because you genuinely cannot not do it.",dance:"Same sequence — once with external pressure energy, once with internal necessity energy.",outfit:"Practice clothes.",location:"Your practice space.",hook:"Text: 'I started this comeback to prove something.' Then: 'Somewhere in the middle, that changed.'",caption:"The best reason to dance is not the most obvious one. 🎯"},
  {id:93,cat:"DOUBT",title:"What the Body Never Forgot",music:"Gentle, wondering instrumental — emotion of unexpected recognition.",concept:"The specific things your body remembered from before the 12-year gap that surprised you.",dance:"The specific sequences that came back without effort — demonstrate them.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'People said the body remembers.' Then: 'This is what mine remembered that I had forgotten it knew.'",caption:"The body is a more faithful keeper of things than the mind. Trust it. 💭"},
  {id:94,cat:"DOUBT",title:"3 AM Before a Performance",music:"Night ambience — quiet room at 3 AM. Low instrumental that sounds like insomnia.",concept:"The 3 AM before a performance — specific thoughts, rehearsal loops, what-ifs. The part nobody films.",dance:"No dance. Stillness reel. Maybe one movement at end — the first move of the piece, done quietly in the dark.",outfit:"Sleeping clothes.",location:"Your bedroom. 3 AM lighting — dark.",hook:"Clock visible showing 3 AM. Text: 'I have a performance in 6 hours. Here is what is happening in my head right now.'",caption:"The performance starts here. Long before the music. 🌙"},
  {id:95,cat:"DOUBT",title:"Imposter Syndrome With History",music:"Tense, thoughtful — weight of self-doubt hitting someone who should not doubt themselves.",concept:"Why imposter syndrome is harder when you have a history of success. The impossibility of not comparing.",dance:"Old performance footage (if available) vs current practice footage.",outfit:"Current practice clothes.",location:"Current practice space.",hook:"Text: 'Having 500 performances behind you makes imposter syndrome worse, not better. Here is why.'",caption:"The past does not always make the present easier. 🧠"},
  {id:96,cat:"DOUBT",title:"What 'You Are Ready' Actually Means",music:"A slightly searching instrumental — feeling of trying to believe something.",concept:"Your guru has said you are ready. What that means when your internal experience does not match.",dance:"The piece she says you are ready to perform. Show the ability — and the doubt alongside it.",outfit:"Practice clothes.",location:"Your dance studio or practice space.",hook:"Text: 'My guru told me I am ready.' Then: 'This is what it feels like to not believe her yet.'",caption:"She has seen more dancers than I have been. I am choosing to trust her eyes over my feeling. 🙏"},
  {id:97,cat:"DOUBT",title:"The Thing That Never Left",music:"Warm, recognising piece — emotion of finding something you thought you had lost.",concept:"The specific quality or presence in your dancing that never left during the 12-year gap.",dance:"The specific movement or expressive quality that came back without effort — at your best.",outfit:"Performance costume or practice clothes.",location:"Practice space.",hook:"Text: 'After 12 years away, most things had to be relearned.' Then: 'Except one.'",caption:"Some things a dancer cannot leave behind even if she tries. That thing is the most honest thing about her. 🕊️"},
  {id:98,cat:"DOUBT",title:"Winning vs Not Placing — Both Honest",music:"Neutral, grounded piece — not triumphant, not defeated.",concept:"An honest look at what winning at finals would mean and what not placing would mean. Both examined.",dance:"Your competition piece — because whatever the outcome, this is the work.",outfit:"Practice clothes.",location:"Wherever you think this kind of thing through.",hook:"Text: 'If I place at finals, here is what it means.' Then: 'If I do not place, here is what it means.' Both specific and honest.",caption:"I am preparing for both outcomes. I am okay with whichever one it is. Mostly. 🎭"},
  {id:99,cat:"DOUBT",title:"If I Had Never Stopped",music:"Slightly wistful piece — not sad, but aware of time.",concept:"The honest answer to 'what if you had never stopped.' Where you might be. Whether imagining that helps.",dance:"A moment showing where you actually are — not where you might have been.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'People ask: where would you be if you had never stopped?' Then: 'I have an answer.' Then: 'I am not sure it helps.'",caption:"The road not taken is real. So is the road you are on right now. Choose which one to look at. 🛤️"},
  {id:100,cat:"DOUBT",title:"What I Am Actually Afraid Of",music:"Quiet, honest — not dramatic. Feels like a private conversation.",concept:"The actual, specific fear about the finals stage. Not the inspirational version. The real one.",dance:"Your competition piece — with this weight on it.",outfit:"Practice clothes.",location:"Your honest space — wherever you think clearly.",hook:"Text: 'What I tell people I am afraid of before finals.' [Something safe.] Then: 'What I am actually afraid of.' [Something real.]",caption:"Naming the fear does not make it go away. But it makes it smaller. Sometimes. 🌑"},

  // TREND 101-120
  {id:101,cat:"TREND",title:"POV: Discovering Kuchipudi Is 2000 Years Old",music:"Mind-blown trending audio.",concept:"The genuine reaction of discovering Kuchipudi has existed continuously for 2000 years.",dance:"Show a piece that could only exist after 2000 years of development.",outfit:"Casual clothes for reaction. Performance costume for dance clip.",location:"Wherever feels natural for a reaction shot.",hook:"Text on black: 'POV: You just googled Kuchipudi.' One fact. Another. Your face. Then: 'And she is performing it in Dallas in 2026.'",caption:"2000 years. Still happening. 💫 #Kuchipudi2000Years"},
  {id:102,cat:"TREND",title:"Day In My Life — Dallas Kuchipudi Dancer",music:"Warm lo-fi — feels like a real day.",concept:"One real day: work, the drive, the class, the late dinner, the practice log. No highlights.",dance:"Your actual class from that day — not staged.",outfit:"Work clothes → practice clothes → home clothes.",location:"Workplace, car, dance studio, home. All of it.",hook:"Text: '6:30 AM. Dallas. This is my actual day.' Then chronological, real, unedited.",caption:"This is what passion looks like on a Tuesday. 📅 #DayInMyLife #DallasDancer"},
  {id:103,cat:"TREND",title:"Things Only Classical Dancers Understand",music:"Trending audio that matches the 'relatable list' format.",concept:"A list of highly specific, only-classical-dancer things — physical habits, mental quirks.",dance:"Each item illustrated with a quick demonstration or relevant clip.",outfit:"Mix of casual and practice clothes.",location:"Various — wherever each item naturally happens.",hook:"Text: 'Things only classical Indian dancers understand.' Then: item 1. Item 2. Fast cuts.",caption:"Tag a classical dancer who gets every single one of these. 👇 #ClassicalDancer"},
  {id:104,cat:"TREND",title:"What I Eat Before vs What I Want To",music:"Light, playful trending audio.",concept:"Specific dietary adjustments before a performance vs what you want to eat. The sacrifice made delicious.",dance:"A quick dance moment connecting to the performance the food is preparing for.",outfit:"Casual home clothes.",location:"Kitchen, dining area.",hook:"Before plate: something light. Text: 'What I eat before a performance.' Then imagined plate. Text: 'What I want to eat.'",caption:"The sacrifice is real. Every single time. 😭🥗 #DancerProblems"},
  {id:105,cat:"TREND",title:"Classical Dancer Reacts to Viral Bollywood Dance",music:"Audio from the viral Bollywood dance.",concept:"Watch a viral Bollywood dance Reel and give your honest, knowledgeable reaction.",dance:"Show the correct version of whatever classical element is being approximated.",outfit:"Casual clothes for reaction. Practice clothes for demonstration.",location:"Couch or casual setting.",hook:"You watching a Bollywood clip. Text: 'Watching this as a classical dancer.' Then: reaction begins.",caption:"I have deep respect for Bollywood. And also opinions. 🎬 #ClassicalDancerReacts"},
  {id:106,cat:"TREND",title:"Tell Me You're A Classical Dancer Without Telling Me",music:"Light trending audio.",concept:"The specific, involuntary ways being a Kuchipudi dancer shows up in your daily life.",dance:"Each 'tell' illustrated with a quick clip.",outfit:"Casual clothes.",location:"Various everyday locations.",hook:"Text: 'Tell me you are a classical dancer without telling me you are a classical dancer.' Then: [specific daily habit].",caption:"My body gave it away years before I told anyone. 😂 #ClassicalDancer #DancerHabits"},
  {id:107,cat:"TREND",title:"Expectations vs Reality — Returning After 12 Years",music:"The classic two-tone trending audio for expectations/reality reels.",concept:"What you thought returning after 12 years would feel like vs what it actually feels like.",dance:"The 'reality' clips from your actual comeback practice.",outfit:"Practice clothes in reality sections.",location:"Practice space for reality.",hook:"Text: 'Expectations:' — something idealistic. Then: 'Reality:' — something honest. Repeat 4-5 pairs.",caption:"The comeback I imagined and the comeback I am in are completely different stories. Both worth living. 🎭"},
  {id:108,cat:"TREND",title:"Get Ready With Me — Competition Day",music:"Building classical music — starting quiet, building to full performance audio when complete.",concept:"The real process of getting ready for a competition — every step, every item.",dance:"The moment you are ready — one powerful movement before you leave.",outfit:"Bare face and casual → full competition costume and makeup.",location:"Your home mirror and dressing area.",hook:"Bare face. Text: 'Competition day. 4:30 AM. Let's go.' Then the process begins.",caption:"45 minutes. Every piece intentional. This is how she becomes her. 💄🌺"},
  {id:109,cat:"TREND",title:"Things Non-Dancers Say",music:"Playful trending audio.",concept:"Specific things non-dancers say when they watch Kuchipudi — and your honest internal reaction.",dance:"Quick demonstrations that answer each comment better than words.",outfit:"Performance costume for the 'answer' demonstrations.",location:"Mix of casual reaction and performance space.",hook:"Text: 'Things non-dancers say when they watch me perform.' Then the list.",caption:"I love every question. Genuinely. Even the ones that make me blink. 😄"},
  {id:110,cat:"TREND",title:"Dance Bag Essentials",music:"Light, upbeat instrumental.",concept:"What actually goes into your dance bag — not the aesthetic version. The specific items.",dance:"Pick up the ankle bells at the end and put them on. That is the closing movement.",outfit:"Practice clothes.",location:"Floor — lay out each item as you describe it.",hook:"Your dance bag. Text: 'What is actually in a classical Indian dancer's bag. Every item.' Then empty it out.",caption:"No item in this bag is optional. Every one of them has a story. 👜 #DanceBag"},
  {id:111,cat:"TREND",title:"500-Performance Dancer vs Beginner",music:"Same piece for both.",concept:"The same 10-second section — your version with 500 performances vs a genuine beginner.",dance:"Your version — clean, trained. Beginner version — a willing friend or student.",outfit:"Matching practice clothes.",location:"Same space, same angle.",hook:"Text: 'Same piece. Same 10 seconds. Two different people.' Then beginner. Then you. Then the difference.",caption:"Nobody starts here. This is what years of specific practice builds. 📈"},
  {id:112,cat:"TREND",title:"Stages of Learning a New Piece",music:"The piece being learned — in various states.",concept:"The actual stages from first hearing a new classical piece to performing it.",dance:"Real footage across the stages — early fumbling, mid-learning, late-stage confidence.",outfit:"Practice clothes throughout.",location:"Practice space across multiple sessions.",hook:"Text: 'Stage 1: Hearing it for the first time.' [Clip — confused face.] 'Stage 2: Counting out loud.' Continues.",caption:"Nobody talks about stage 3. Stage 3 is the hardest. 😅 #LearningDance"},
  {id:113,cat:"TREND",title:"If My Practice Were a Movie",music:"Dramatic movie trailer style audio — over the top on purpose. Then switch to actual mundane practice.",concept:"The gap between how a dance practice feels from inside and what it looks like from outside.",dance:"Clips of actual practice with dramatic music that does not match the mundane reality.",outfit:"Practice clothes — the unglamorous reality.",location:"Your actual home practice space.",hook:"Dramatic music begins. Text: 'If my practice session were a movie.' Clips of you adjusting your hair, trying moves three times.",caption:"The internal experience is EPIC. The footage is... something else. 🎬😂"},
  {id:114,cat:"TREND",title:"Questions Non-Indians Always Ask Me",music:"Light, friendly instrumental.",concept:"Answer the 5 most common questions non-Indian people ask about Kuchipudi — honestly, generously.",dance:"Each question illustrated with a brief movement-based answer.",outfit:"Performance costume for visual authenticity.",location:"Your practice space.",hook:"Text: 'Questions non-Indians always ask me about my dance. Answered.' Then question 1.",caption:"I love being asked. Every question is someone wanting to understand. 🤝 #KuchipudiExplained"},
  {id:115,cat:"TREND",title:"Classical Dancer Tries Trending Challenge",music:"The trending challenge audio.",concept:"Attempt a trending dance challenge as a classical Kuchipudi dancer.",dance:"The trending challenge — your honest attempt. Then a brief Kuchipudi version.",outfit:"Casual clothes for the challenge.",location:"Your living room — casual.",hook:"Text: 'Classical dance trained me for many things. A trending challenge was not one of them.' Then your attempt.",caption:"Years of training and I still look like this when I try to be casual. 😭 #DanceChallenge"},
  {id:116,cat:"TREND",title:"Ranking Kuchipudi Pieces by Difficulty",music:"Transition between the pieces being ranked.",concept:"An honest personal ranking of the Kuchipudi pieces you know from easiest to hardest.",dance:"Brief clips from each piece as you rank it.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'Ranking the Kuchipudi pieces I know by how hard they are. Based on personal experience.'",caption:"The hardest one is also my favourite. That is probably not a coincidence. 📊"},
  {id:117,cat:"TREND",title:"The Real Cost of Being a Classical Dancer in America",music:"Honest, slightly heavy instrumental.",concept:"The actual financial, time, and social cost of pursuing classical Indian dance seriously in the USA.",dance:"A moment from your performance — what all the cost is for.",outfit:"Casual clothes for honest part. Performance costume for closing.",location:"Wherever you normally talk honestly.",hook:"Text: 'The real cost of being a classical dancer in America. And I mean all of it.'",caption:"I know exactly what this costs. I have paid it every month. Worth it every month. 💸"},
  {id:118,cat:"TREND",title:"Signs You Were Raised in Classical Dance",music:"Light, nostalgic.",concept:"The specific signs — physical and behavioural — that someone was raised in classical Indian dance.",dance:"Each sign illustrated with a quick demonstration.",outfit:"Casual clothes.",location:"Various everyday locations.",hook:"Text: 'Signs you were raised in classical Indian dance.' Then: sign 1. Sign 2. Fast pace.",caption:"Tag someone who started before they were 5. 👶 #ClassicalDancerKids"},
  {id:119,cat:"TREND",title:"Husband Rates My Dance Moves",music:"Playful, warm audio.",concept:"Show your husband specific movements and have him rate them without any classical dance vocabulary.",dance:"5-7 moves, ranging from simple to extremely complex.",outfit:"Practice clothes.",location:"Your home practice space — casual.",hook:"You doing a simple move. Husband: '10/10.' You doing your most technical sequence. Husband: 'I'd say 7.' Your face.",caption:"He gives my simplest move a perfect score. That is either love or ignorance. Probably both. 😂"},
  {id:120,cat:"TREND",title:"Before vs After the Performance",music:"Two contrasting audio moods — tense before, relieved after.",concept:"Same location, same person, same camera angle — before and after a performance. Completely different energy.",dance:"Before: stillness, internal focus. After: the release, the relief.",outfit:"Full performance costume in both — but different energy.",location:"Backstage or just outside the performance space.",hook:"You before the performance — quiet, focused. Text: 'Before.' Then immediately after. Text: 'After.' No explanation.",caption:"The same person. One hour apart. Ask me what happened in between. 🎭"},

  // BTS 121-135
  {id:121,cat:"BTS",title:"My Real Practice Space",music:"Room audio — your actual home practice space sounds.",concept:"Your home practice space as it actually is — not cleaned up, not staged.",dance:"One real practice run in the real space.",outfit:"Whatever you actually practice in at home.",location:"Your home practice space — no staging.",hook:"You opening a door or turning to face the space. Text: 'My dance studio. Unfiltered.'",caption:"No one cleans for practice. The mess means I was here. 🏠"},
  {id:122,cat:"BTS",title:"10 Minutes Backstage",music:"Original audio — ambient sounds backstage. Muffled music, voices, footsteps.",concept:"What actually happens in the 10 minutes before you walk on stage.",dance:"Brief fragments of warm-up movement backstage.",outfit:"Full performance costume — backstage, real.",location:"Backstage at a performance venue.",hook:"You in full costume backstage. Text: 'Nobody films this part. I am going to show you.'",caption:"The performance starts here. Long before the audience sees it. 🎭"},
  {id:123,cat:"BTS",title:"Setting Up the Costume — Competition Day",music:"Sound of each piece being laid out — silk, metal of jewellery. Then quiet instrumental.",concept:"Every single item of the competition costume laid out before being put on.",dance:"The final moment — fully dressed — one movement before you leave.",outfit:"The competition costume being assembled.",location:"Wherever you dress for competition.",hook:"Empty bed or table. Then costume pieces laid out one by one. Text: 'Competition day preparation. Every single item.'",caption:"Before the stage, there is this. Quiet, deliberate, specific. 💎"},
  {id:124,cat:"BTS",title:"10 Minutes After the Performance",music:"Ambient sound after a performance — hall emptying, voices, relief.",concept:"What happens in the 10 minutes after a performance ends. The release, the physical sensation.",dance:"No formal dance. The body after — resting, releasing.",outfit:"Full performance costume — post-performance.",location:"Backstage, just offstage, or wherever you go immediately after.",hook:"You just offstage after a performance. Breathing. Text: 'Nobody films this part either.'",caption:"This is what happens when the music stops. 🌬️"},
  {id:125,cat:"BTS",title:"Guru Correcting Me — Live",music:"The actual class music — live and real.",concept:"Your guru correcting you in real time during class — with her permission.",dance:"The movement being corrected — before and after in the same class.",outfit:"Practice clothes.",location:"Your dance studio during actual class.",hook:"You dancing. Your guru stopping you. Her correction — filmed and subtitled if spoken in Telugu.",caption:"This is what learning looks like. Not the highlight reel. The actual lesson. 🎓"},
  {id:126,cat:"BTS",title:"Notes Session With Guru",music:"Silence — or very quiet ambient class sounds.",concept:"The notes session with your guru after a run-through — what she says, what you write down.",dance:"Brief demonstrations of what she is describing.",outfit:"Practice clothes.",location:"Your dance studio — after class.",hook:"You and your guru seated, your notebook open. Text: 'What happens after practice is as important as practice.'",caption:"My most important classroom has no walls. 📓"},
  {id:127,cat:"BTS",title:"Packing the Costume Bag",music:"Sounds of packing — silk, jewellery box, bag zipper. Original audio.",concept:"Packing the performance costume the night before — every item, in specific order, with specific care.",dance:"No formal dance. The packing IS the performance.",outfit:"Home clothes while packing.",location:"Your bedroom or wherever you pack.",hook:"An empty bag. Text: 'The night before a performance. Everything gets packed in a specific order. Here is why.'",caption:"Preparation is love made visible. 🧳"},
  {id:128,cat:"BTS",title:"The Drive to a Competition",music:"Whatever you actually listen to on the drive — be honest.",concept:"The drive to a competition — what you play, what you think, whether you rehearse in your head.",dance:"No dance during the drive. But the moment you arrive — one breath, one arm movement.",outfit:"Competition costume in the bag. You in regular clothes driving.",location:"Your car, Dallas roads.",hook:"You in the driver's seat. Text: 'Competition day drive. Here is what I play. Here is what goes through my head.'",caption:"The competition starts in the car. Maybe before that. 🚗"},
  {id:129,cat:"BTS",title:"The Competition Hall Before",music:"Ambient competition hall sounds — echo of an empty venue.",concept:"What the competition hall looks like when you arrive — before the event begins.",dance:"A brief warm-up in the hall — adjusting to the space, claiming the stage.",outfit:"Partial competition costume or practice clothes on arrival.",location:"The competition venue.",hook:"An empty competition stage from the back of the hall. Text: 'This is what it looks like before anyone is watching.'",caption:"Every stage starts empty. Then you arrive. Then it becomes somewhere. 🎭"},
  {id:130,cat:"BTS",title:"Post-Competition Dinner",music:"Warm, ambient restaurant or home dinner sounds.",concept:"The conversation over dinner after the competition with your husband — the honest debrief.",dance:"No dance. This is a conversation reel.",outfit:"Dinner clothes — post-competition, real.",location:"Wherever you have dinner after — restaurant, home.",hook:"You across the dinner table from your husband. Text: 'What we talk about after a competition.'",caption:"This dinner is different from every other dinner. He knows to ask different questions on this night. 🍽️"},
  {id:131,cat:"BTS",title:"Setting Up the Puja Before",music:"Original audio — bells, Sanskrit words, quiet of ritual.",concept:"The specific ritual you perform before a performance or competition at home.",dance:"The first movement after the puja is complete.",outfit:"Partially in costume.",location:"Your home puja space or altar.",hook:"Hands arranging items at altar. No text. Just sound. Then: text explaining what is happening.",caption:"I have never performed alone. The tradition performs with me. 🪔🙏"},
  {id:132,cat:"BTS",title:"Showing Up When Exhausted",music:"Slow, tired music — sounds like dragging yourself. Then it builds as class begins.",concept:"What practice looks like on a day when you are genuinely exhausted — and you show up anyway.",dance:"Real exhausted practice footage — the quality different, the effort still there.",outfit:"Practice clothes — the lived-in, end-of-day version.",location:"Your dance studio or home practice space.",hook:"You arriving at class looking tired. Text: 'I had three meetings, a report due, and slept 5 hours. I am here anyway.'",caption:"Some days the showing up IS the dance. 🌿"},
  {id:133,cat:"BTS",title:"My Pre-Class Warm-Up",music:"Your actual warm-up music.",concept:"The specific warm-up routine you do before every class — exactly the same, every time.",dance:"Your actual warm-up — unperformed, functional, repetitive.",outfit:"Practice clothes — start-of-class version.",location:"Your dance studio or practice space, before class begins.",hook:"Text: 'I do the same warm-up before every single class. Every time.' Then: the warm-up begins, labelled.",caption:"The routine before the routine. You do not skip it. 🔄"},
  {id:134,cat:"BTS",title:"My Camera Roll",music:"Playful background music as you scroll through a phone.",concept:"What your camera roll actually looks like — hundreds of practice videos, bad takes, retakes.",dance:"Play several of the practice videos you scroll past — the real ones.",outfit:"Various — whatever you were wearing when each was recorded.",location:"Wherever you scroll — couch, bed.",hook:"Your phone screen — camera roll scrolling. Text: 'What a dancer's camera roll looks like.'",caption:"Approximately 600 practice videos. Maybe 30 are good. All of them mattered. 📱"},
  {id:135,cat:"BTS",title:"The Moment Before I Step On Stage",music:"Your own breath. Ambient backstage sound. Then first note of your piece as you step forward.",concept:"The literal last moment before you step on stage — from your perspective, looking toward the wings.",dance:"The first step onto the stage — just that. Crossing the threshold.",outfit:"Full performance costume.",location:"Just offstage — shot from your perspective looking toward the stage.",hook:"POV shot — stage visible ahead. Text: 'This moment. Every single time.' Then the first step forward.",caption:"Nothing is the same after this step. Every single time, everything changes. 🌟"},

  // JOURNEY 136-150
  {id:136,cat:"JOURNEY",title:"The Full Regionals Story",music:"Your actual competition piece audio.",concept:"A narrative compilation of the entire regionals journey — from decision to train, to the day of, to the result.",dance:"Actual regionals performance footage as the centrepiece.",outfit:"Competition costume in performance footage.",location:"All locations across the journey.",hook:"Text: 'I am going to tell you the whole story.' Then: Decision. Training. Day of. Result. In sequence.",caption:"This is the story of how I came back. The full one. 📖 #KuchipudiComeback"},
  {id:137,cat:"JOURNEY",title:"First Full Run-Through",music:"Your competition piece — the first real run.",concept:"The very first time you ran your competition piece from beginning to end without stopping.",dance:"The first full run — imperfect, real, historic.",outfit:"Practice clothes.",location:"Your dance studio.",hook:"Text: 'First time running it all the way through.' Then it begins. No cuts. Full run.",caption:"The first run is always the worst run. It is also the most important one. 🏁"},
  {id:138,cat:"JOURNEY",title:"Getting Feedback After Regionals",music:"Neutral, slightly contemplative.",concept:"What the judges said after regionals. What your guru said. What you are now fixing.",dance:"The specific section being adjusted — before and after.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'Regionals is done. Here is what the feedback said.' Then: specific, honest, what is being changed.",caption:"Feedback is a gift. Even when it costs something. 🎁"},
  {id:139,cat:"JOURNEY",title:"The Finals Preparation Schedule",music:"Driving, purposeful classical music.",concept:"What the preparation schedule for finals actually looks like — hours, breakdown, specific focus areas.",dance:"Clips from each phase of the preparation schedule.",outfit:"Practice clothes.",location:"Practice space and dance studio.",hook:"Text: 'Finals are in [X] weeks. Here is the plan.' Then the schedule — specific, real.",caption:"The plan is simple. The execution is everything. 📋"},
  {id:140,cat:"JOURNEY",title:"Why I Chose This Piece",music:"The finals piece — let it play as the answer.",concept:"The real reason you chose this specific piece for finals. Not the strategic reason. The actual personal reason.",dance:"The piece — or its most meaningful section.",outfit:"Performance costume.",location:"Your practice space.",hook:"Text: 'Why did I choose this piece for finals?' Then: 'Here is the honest answer.'",caption:"The piece chose me before I chose it. I just agreed eventually. 🎵"},
  {id:141,cat:"JOURNEY",title:"Regionals vs Finals — The Difference",music:"Your competition piece — showing the evolution.",concept:"Specific comparisons between how you performed at regionals and how you intend to perform at finals.",dance:"Regionals footage vs current practice footage — same sections compared.",outfit:"Competition costume in regionals. Practice clothes in current footage.",location:"Split — regionals venue and practice space.",hook:"Text: 'Here is what regionals looked like.' [Clip.] Then: 'Here is what I am doing differently.' [Clip.]",caption:"I saw it clearly on the video. I am fixing it one practice at a time. 🔧"},
  {id:142,cat:"JOURNEY",title:"Seeing the Other Finalists",music:"Neutral — not competitive, not fearful. Just observant.",concept:"Your honest, respectful reaction to seeing the other finalists for the first time.",dance:"Your piece — because ultimately the only competition is the piece, not the other dancers.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'I saw the other finalists.' Then: 'Here is my honest reaction.' Genuinely honest.",caption:"The best thing about seeing other excellent dancers is knowing the level. Now I know. 👁️"},
  {id:143,cat:"JOURNEY",title:"What My Guru Changed After Regionals",music:"Your competition piece — the changed version.",concept:"The specific things your guru adjusted in your piece after seeing the regionals performance.",dance:"The adjusted sections — before and after the changes.",outfit:"Practice clothes.",location:"Dance studio.",hook:"Text: 'After regionals, my guru changed three things.' Then: what she changed. Why. Show the difference.",caption:"A guru watches what you cannot see while you are inside the dance. 🎯"},
  {id:144,cat:"JOURNEY",title:"Week Before Finals — Daily Log",music:"Building classical composition — intensity building toward the final day.",concept:"A daily practice log for the week before finals — each day honest, specific, real.",dance:"Clips from each day — the full honest arc of the final week.",outfit:"Practice clothes throughout.",location:"Practice space across the week.",hook:"Text: 'Finals in 7 days. I am going to show you every day.' Day 1. Day 2. Through Day 7.",caption:"Seven days. Every one of them counts. Every one of them is documented. 📆"},
  {id:145,cat:"JOURNEY",title:"Competition Day Finals — Full Day",music:"Arc of the day's audio — quiet morning sounds through to performance music.",concept:"The complete finals day from morning to result. Everything.",dance:"The performance from finals day — the central act.",outfit:"Morning clothes → practice clothes → competition costume.",location:"Home, car, venue. All of it.",hook:"Time stamp: 6:00 AM. Then chronological. Every part of the day. Real.",caption:"This is what a competition day looks like from the inside. All of it. 🕐"},
  {id:146,cat:"JOURNEY",title:"Right After My Finals Performance",music:"Original audio — ambient sound of just having performed.",concept:"Filmed immediately after your finals performance — before results. The raw unprocessed emotion.",dance:"No new dance. The performance just happened.",outfit:"Full competition costume.",location:"Backstage or just offstage at the finals venue.",hook:"You just offstage. Breathing. Text: 'This was filmed 2 minutes after my finals performance. Before I knew the result.'",caption:"This moment is mine regardless of what comes next. 🌬️"},
  {id:147,cat:"JOURNEY",title:"The Result",music:"Original audio — whatever the actual result announcement sounds like.",concept:"The result — whatever it is — filmed with your honest, unperformed reaction. No staging.",dance:"Nothing required. This is a human moment.",outfit:"Competition costume or whatever you are wearing.",location:"Wherever results are announced.",hook:"No text. Just the moment. Real time. Let people watch.",caption:"Whatever happened, I was here. I danced. I came back after 12 years. No result changes any of that. 🕊️"},
  {id:148,cat:"JOURNEY",title:"What Competing Taught Me",music:"Warm, reflective instrumental.",concept:"The specific things the competition process taught you — regardless of the result.",dance:"A final performance of the competition piece — with everything you learned.",outfit:"Practice clothes.",location:"Practice space.",hook:"Text: 'The competition taught me things the result could not.' Then: the specific lessons.",caption:"I went in to compete. I came out knowing something about myself I did not know before. 🌱"},
  {id:149,cat:"JOURNEY",title:"Who I Want to Thank",music:"Warm, gratitude-holding.",concept:"The specific people who made the comeback and competition possible — named, by role, specific thing they gave.",dance:"A portion of the competition piece — as a dedication.",outfit:"Performance costume.",location:"Your performance space.",hook:"Text: 'I want to thank some people. By name. For specific things.' Then: your guru. Your husband. Your family.",caption:"I did not come back alone. I came back with all of these people. 🙏🤍"},
  {id:150,cat:"JOURNEY",title:"What Comes After Finals",music:"Open, forward-moving — sounds like beginning rather than ending.",concept:"The next chapter — said out loud for the first time. What you want to do after the competition.",dance:"The first movement of the next thing — whatever piece or style you are moving toward.",outfit:"Practice clothes — beginning again.",location:"Your practice space.",hook:"Text: 'Finals is done.' Then: 'Here is what I am doing next.' Then the answer — specific and spoken aloud.",caption:"The comeback does not end. It just moves into the next chapter. I am ready. 🌅 #NextChapter"},
];

const HOOKS = [
  {id:1,type:"STORY",title:"The Time Gap Hook",trigger:"Curiosity Gap + Time Pressure",interrupt:"Leads with a number that implies loss",formula:"[NUMBER] years. And I still don't know if [HONEST DOUBT].",example:"12 years. And I still don't know if my body remembers how to do this.",why:"The unresolved doubt forces viewers to watch for the resolution.",fields:[{l:"Number of years",k:"years",d:"12"},{l:"Your honest doubt",k:"doubt",d:"my body remembers how to do this"}]},
  {id:2,type:"STORY",title:"The Witness Hook",trigger:"Social Proof + Emotional Curiosity",interrupt:"Starts with someone else's reaction, not your performance",formula:"The first time [PERSON] saw me [ACTION] — [UNEXPECTED REACTION].",example:"The first time his entire family saw me dance — his mother started crying.",why:"Reactions hook deeper than actions. Viewers stay to understand why.",fields:[{l:"Who witnessed it",k:"person",d:"his entire family"},{l:"What they saw",k:"action",d:"dance"},{l:"Their unexpected reaction",k:"reaction",d:"his mother started crying"}]},
  {id:3,type:"STORY",title:"The Contradiction Hook",trigger:"Cognitive Dissonance",interrupt:"Two things that shouldn't coexist in one sentence",formula:"I [ACHIEVEMENT]. And I've never been more [OPPOSITE EMOTION].",example:"I qualified for finals. And I've never been more terrified.",why:"The brain must resolve the contradiction. It cannot scroll until it does.",fields:[{l:"Your achievement",k:"achievement",d:"qualified for finals"},{l:"Opposite emotion",k:"emotion",d:"terrified"}]},
  {id:4,type:"DOUBT",title:"The Admission Hook",trigger:"Radical Vulnerability",interrupt:"Confesses failure before showing any skill",formula:"I watched my [CONTENT] back. I almost [SELF-DOUBT ACTION].",example:"I watched my practice video back. I almost deleted the whole thing.",why:"Vulnerability before competence breaks the 'perfect dancer' scroll pattern.",fields:[{l:"What you watched",k:"content",d:"practice video"},{l:"What you almost did",k:"action",d:"deleted the whole thing"}]},
  {id:5,type:"DOUBT",title:"The Night Before Hook",trigger:"Anticipation + Shared Anxiety",interrupt:"Puts viewer inside a specific private moment",formula:"It's [TIME]. [TOMORROW EVENT]. And I can't stop thinking about [SPECIFIC FEAR].",example:"It's 11pm. I compete tomorrow. And I can't stop thinking about the 12 years I lost.",why:"Specificity of time (11pm) creates immediate intimacy. Viewer feels they're there.",fields:[{l:"Time of night",k:"time",d:"11pm"},{l:"What's happening tomorrow",k:"event",d:"I compete"},{l:"Your specific fear",k:"fear",d:"the 12 years I lost"}]},
  {id:6,type:"CONTEXT",title:"The Reveal Hook",trigger:"Exclusivity + Education",interrupt:"Makes viewer feel they're about to learn a secret",formula:"Most people watch the [OBVIOUS THING]. Dancers watch the [HIDDEN THING].",example:"Most people watch the feet. Dancers watch the eyes.",why:"Creates an in-group. Viewer wants to be the one who knows.",fields:[{l:"What most people notice",k:"obvious",d:"feet"},{l:"What experts notice",k:"hidden",d:"eyes"}]},
  {id:7,type:"CONTEXT",title:"The Factual Shock Hook",trigger:"Disbelief + Education",interrupt:"States an impossible-sounding fact as plain truth",formula:"She is [UNBELIEVABLE ACTION]. This is called [NAME]. It is [AGE] years old.",example:"She is dancing on a brass plate. This is called Tarangam. It is 2000 years old.",why:"The brain rejects the first sentence and watches to confirm or deny it.",fields:[{l:"The unbelievable action",k:"action",d:"dancing on a brass plate"},{l:"The technique name",k:"name",d:"Tarangam"},{l:"Age of tradition",k:"age",d:"2000"}]},
  {id:8,type:"ART",title:"The Silence Hook",trigger:"Pattern Interrupt + Sensory Curiosity",interrupt:"Opens with no music — just raw ambient or body sound",formula:"[VISUAL OF BODY PART]. [SOUND IT MAKES]. [ONE LINE OF CONTEXT].",example:"Close-up of feet on brass plate. Sound of plate resonating. 'That ring is intentional.'",why:"Silence in the first second stops autoplay scroll dead. Brain thinks something is wrong.",fields:[{l:"Body part or object shown",k:"visual",d:"feet on brass plate"},{l:"Natural sound heard",k:"sound",d:"plate resonating"},{l:"One line of context",k:"context",d:"That ring is intentional"}]},
  {id:9,type:"ART",title:"The Reframe Hook",trigger:"Perspective Shift",interrupt:"Describes your art as something the audience already knows",formula:"If [FAMILIAR THING] had [KUCHIPUDI ELEMENT] — it would look like this.",example:"If ballet had 2000 years of unbroken storytelling tradition — it would look like this.",why:"Anchoring to a familiar reference lowers the barrier for non-dance audiences.",fields:[{l:"Familiar reference point",k:"familiar",d:"ballet"},{l:"What makes Kuchipudi different",k:"element",d:"2000 years of unbroken storytelling"}]},
  {id:10,type:"DOUBT",title:"The Identity Challenge Hook",trigger:"Identity Trigger + Shared Experience",interrupt:"Directly calls out a specific person who will feel seen",formula:"If you [SPECIFIC SITUATION] and have not [ACTION YET] — this is for you.",example:"If you gave up classical dance for a career and have not gone back — this is for you.",why:"Direct address ('you') doubles watch time. Feels personal, not broadcast.",fields:[{l:"Who you're speaking to",k:"person",d:"gave up classical dance for a career"},{l:"What they haven't done yet",k:"action",d:"gone back"}]},
];

const POWER_WORDS = [
  {w:"Finally",t:"Relief",n:"Implies a long wait is over. Powerful after 12 years of break."},
  {w:"Nobody told me",t:"Secret",n:"Reader feels they're getting hidden information."},
  {w:"After 12 years",t:"Time",n:"Specific time gap. Never say 'a long time'. Always say the number."},
  {w:"Still",t:"Tension",n:"Implies something unresolved. Creates forward pull."},
  {w:"Watch what happens",t:"Curiosity",n:"Direct command. Works best with visual payoff in 3 sec."},
  {w:"The truth is",t:"Honesty",n:"Signals you are about to say something others won't."},
  {w:"I almost quit",t:"Vulnerability",n:"Universal. Every person has almost quit something."},
  {w:"This broke me",t:"Emotion",n:"High intensity. Use sparingly — once every 10 reels."},
  {w:"For the first time",t:"Milestone",n:"Combines nostalgia + novelty. Strong for comeback content."},
  {w:"They cried",t:"Reaction",n:"Social proof through emotion. Makes viewer want to see why."},
  {w:"I failed",t:"Relatability",n:"Disarms the 'perfect dancer' expectation immediately."},
  {w:"Before vs After",t:"Contrast",n:"Visual comparison. Works best shown, not just said."},
  {w:"Only 1% know",t:"Exclusivity",n:"Used for context/education reels about Kuchipudi specifics."},
  {w:"Wait for it",t:"Anticipation",n:"Works only if the payoff delivers in under 5 sec."},
  {w:"This changed everything",t:"Transformation",n:"Best used AFTER the change, not before."},
  {w:"Real footage",t:"Authenticity",n:"Signals this is not staged. Audiences trust it more."},
];

const STORY_BANK = {
  "The 12-Year Gap":["The last performance before the break — what song, what stage, did you know it was the last one?","The moment in college you realised you hadn't danced in a full year.","The first time someone asked 'do you still dance?' and you didn't know how to answer.","What you told yourself to justify stopping.","Whether you actually believed it was temporary or secretly thought it was over.","The guilt of watching other dancers your age progress while you were in classrooms.","Did you keep your costumes during those 12 years? Show them. Were they packed? Dusty?","The moment something made you miss it so badly it physically hurt — what triggered it?","What 'going back' meant to you vs what it actually felt like when you did.","The first class after 12 years — what your body remembered and what it forgot."],
  "Coming Back":["Walking into a dance class for the first time after 12 years — what that room felt like.","The first time your body did something correctly after the gap.","The first time your body completely failed you after the gap.","Watching your guru's face the first time you danced again.","Re-learning something you used to do effortlessly as a child.","The physical pain of coming back — muscles, stamina, what nobody tells you.","The mental block of knowing what you should look like but not being able to do it yet.","The first performance after returning — every thought running through your head backstage.","Comparing your 12-year-ago self to your now self — honestly, not inspirationally.","The day you stopped feeling like a beginner again."],
  "Being 24 in the USA":["Walking into a class and being the only person your age — what that looks like.","The loneliness of loving something almost nobody your age around you understands.","Trying to explain Kuchipudi to American coworkers — their actual reactions.","When someone asks 'is that like Bollywood?' — your real internal reaction vs what you say.","What your non-Indian friends think you do on weekends.","Scrolling Instagram and seeing people your age at concerts while you're at rehearsal.","Whether you have ever felt embarrassed about classical dance in front of peers.","What you wish someone your age in Dallas also loved this art form.","The age gap in your dance class — who else is there, what is that dynamic?","Meeting another Indian dancer your age in the USA — how rare that is."],
  "500 Performances":["The very first performance — how old, what piece, what you were wearing.","The worst performance of 500 — what went wrong, how you recovered or didn't.","The most unexpected audience reaction — the one you didn't see coming.","A performance where something went technically wrong but the audience never knew.","The smallest audience you ever performed for — harder or easier?","The largest stage you have ever stood on — what that feels like from the wings.","A performance where you cried on stage — what piece, what emotion broke through.","The performance you wish you could redo.","The one that made you certain this was your life's purpose.","A performance someone from the audience still remembers and brought up years later."],
  "India vs USA — Identity":["What Kuchipudi means in India vs what it means when you perform it in Texas.","Dancing in India where the audience knows every nuance vs USA audiences seeing it first time.","The thing about Indian classical dance you only truly appreciated after leaving India.","When you feel most Indian — is it when you're dancing?","Whether your relationship to the art changed after moving to America.","What you carry from India in your dance that you're afraid of losing.","The first time an American audience gave you a standing ovation — vs an Indian audience.","Explaining to Americans why this art form is 2000 years old.","The cultural loneliness of being a classical dancer in a diaspora.","What your dance means to your family back in India watching from far away."],
  "Work and Passion Balance":["A specific week where work and dance rehearsal clashed — what you chose, what you sacrificed.","Changing into dance clothes in your car or work bathroom — show it.","The exhaustion of a full workday followed by a 2-hour dance class.","When a work deadline fell on the same day as a performance.","What your non-dancing colleagues think when they find out you compete.","Whether your workplace knows you are a serious competitive dancer.","The Sunday when you could have rested but chose rehearsal instead — why.","What you give up to dance — specifically, concretely, not inspirationally.","The calculation you make every week between career ambition and dance ambition.","What 'balance' actually looks like in your real life — not the Instagram version."],
  "Competition Journey":["The moment you decided to enter the competition after 12 years away.","The fear before registering — did you almost not do it?","First rehearsal specifically preparing for regionals — what piece, what was the standard.","The self-doubt during competition prep — when it peaked.","Competition day at regionals — morning of, getting ready, what you were thinking.","The moment you finished your regional performance — before results, just that moment.","When they announced you qualified for finals — your exact reaction, who was with you.","What qualifying means after 12 years away — not generically, specifically.","Calling your family in India to tell them you qualified — their reaction.","Your husband's reaction when you qualified — what he said or did."],
  "Family and Support":["The first time your husband watched you practice at home — his actual unfiltered reaction.","A specific thing your husband does during competition prep that he doesn't have to do.","Your mother-in-law and Kuchipudi — beyond the viral moment, what is that relationship?","A time your family in India watched you perform over a video call.","What your parents sacrificed for your dance training in India — specifically.","Your mother's relationship to your dance — was she the one who started you?","A phone call with a parent back in India about the competition.","The people who believed in your return before you believed in it yourself.","What your husband understands about dance that surprises you.","What you want to show your future children through this journey."],
  "Raw and Unfiltered":["Whether you have ever seriously considered quitting again since coming back.","What you do when the motivation is gone but the deadline is not.","The imposter syndrome of returning around people who never stopped.","A critique from your guru that stung — what was said, what it meant.","The gap between how you see yourself dancing and how the camera shows you.","What you are actually afraid of before finals — not the inspirational version.","If you don't place well at finals, what then? Have you thought about that?","The loneliness of ambition — wanting something this specific that almost no one shares.","What this comeback has taught you about yourself that dance specifically revealed.","The version of yourself at 12 who started dancing — what would she think of where you are right now?"],
};

const DOUBT_BANK = {
  "Body Doubt":["The first time you looked in the mirror during practice and didn't recognise the dancer looking back.","When your body did something your 12-year-old self did effortlessly — and it just didn't work.","The specific move or expression that used to be your strongest and now feels foreign.","The day your stamina gave out mid-rehearsal and you had to sit on the floor and breathe.","Watching a video of yourself at age 12 and not knowing if you can get back there.","The moment you realised 12 years of not dancing left a physical debt your body is still repaying.","When your feet forgot something they once knew by heart.","The first time you got injured during comeback training — 'maybe my body is not built for this anymore'.","Standing in costume after 12 years looking in the mirror — what went through your mind honestly.","The gap between what your brain tells your body to do and what your body actually does."],
  "Comparison Doubt":["Finding a dancer on Instagram your age who never stopped — scrolling and feeling that gap.","Walking into class and watching someone younger than you do something you can't yet.","Whether you have pulled up your own old performance videos and compared them to now.","The specific standard in your head you are trying to reach — and whether you think you actually can.","When someone compliments you and your first instinct is 'they don't know what I used to be capable of'.","Competing at regionals and sizing up the room — the moment you thought 'I don't know if I can beat that'.","Whether you have ever lied to yourself about your current level — and had practice expose the lie.","The internal conversation when you see a 16-year-old dance better than you currently can.","What 'being as good as before' means to you — defined or a moving target getting further away?","Whether 500 performances feel like an asset or pressure."],
  "Identity Doubt":["The moment you asked yourself: am I a dancer who took a break, or someone who used to dance?","Whether you felt like a fraud walking into your first competition registration after 12 years.","Introducing yourself as a Kuchipudi dancer to someone new — the flicker of doubt before the words.","When someone from your past who knew you as a serious dancer sees you now.","Whether you have told people about the competition and immediately regretted it.","The difference between how confident you appear on stage and what is happening inside you.","A moment where you performed well and still couldn't let yourself fully believe it counted.","Whether the 12-year gap made you feel like you forfeited your right to call yourself serious.","What you say to yourself in the seconds before stepping on stage — the real version.","Whether you are dancing to prove something to yourself, to others, or you don't know which."],
  "The What-If Doubt":["What if you had never stopped — where would you be, and does that thought help or hurt?","What if you qualify for finals and completely fall apart?","What if the judges don't see what your family sees?","What if you place last at finals — what is the honest answer to 'what then'?","What if your body cannot get back to where it was — have you made peace with that?","What if this comeback is the peak and it plateaus here — is this enough?","What if the 12-year-old version of you was more talented and that window is simply closed?","What if the people supporting you are being kind rather than accurate?","What if you pour everything into this comeback and it doesn't translate on stage?","What if it does work — are you ready for what comes after that?"],
  "Day-to-Day Doubt":["A specific practice session where you drove home in silence because it went badly.","The text you almost sent your guru saying you needed a break — and why you didn't send it.","Lying in bed the night before a hard rehearsal — the specific thought that makes sleep difficult.","When your husband asks 'how was practice?' on a bad day — what you actually say vs what you feel.","The morning you woke up and genuinely could not find the reason to keep going — what got you up.","A moment where you cried after practice — not from joy, from frustration at yourself.","When you watch your own Reel back and your first instinct is to find everything wrong.","The doubt that comes specifically at night that doesn't come during the day.","Whether you have ever searched 'is it too late to return to classical dance'.","The version of the doubt that is loudest right now — what is it actually saying?"],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useCopy() {
  const [id, setId] = useState(null);
  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setId(key);
      setTimeout(() => setId(null), 2000);
    });
  };
  return [id, copy];
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
const Tag = ({ cat, sm }) => {
  const m = CAT[cat] || CAT.STORY;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      padding: sm ? "2px 8px" : "4px 12px",
      background: m.c + "22", border:`1px solid ${m.c}44`,
      borderRadius:20, fontSize: sm ? 10 : 11,
      fontWeight:600, color:m.c, letterSpacing:1,
      textTransform:"uppercase", whiteSpace:"nowrap",
      fontFamily: T.sans,
    }}>
      {m.icon} {m.label}
    </span>
  );
};

const CopyBtn = ({ text, id, copiedId, onCopy }) => (
  <button
    onClick={() => onCopy(text, id)}
    style={{
      background:"none", border:`1px solid ${copiedId === id ? T.green : T.border}`,
      borderRadius:6, padding:"4px 10px", cursor:"pointer",
      fontFamily:T.sans, fontSize:10, fontWeight:600,
      color: copiedId === id ? T.green : T.faint,
      transition:"all 0.2s", flexShrink:0,
    }}
  >
    {copiedId === id ? "✓ Copied" : "Copy"}
  </button>
);

const Field = ({ label, value, icon, color, copiedId, onCopy }) => (
  <div style={{ marginBottom:12 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
      <span style={{ fontFamily:T.sans, fontSize:10, fontWeight:600, color, letterSpacing:2, textTransform:"uppercase" }}>
        {icon} {label}
      </span>
      <CopyBtn text={value} id={label} copiedId={copiedId} onCopy={onCopy} />
    </div>
    <div style={{
      padding:"10px 14px", background:"#0A0603",
      border:"1px solid " + T.border, borderLeft:`3px solid ${color}`,
      borderRadius:"0 6px 6px 0",
      fontFamily:T.sans, fontSize:12, lineHeight:1.65, color:"#C8A878",
    }}>{value}</div>
  </div>
);

// ─── PAGES ────────────────────────────────────────────────────────────────────
function Home() {
  const rules = [
    ["The Scroll Test", "Your hook must work on someone who has never heard of Kuchipudi, scrolling at 11pm half-asleep."],
    ["Reel Rotation", "Story → Art → Context/Doubt → repeat. Every 3 Reels."],
    ["Audio Split", "70% trending audio for reach. 30% original audio for conversion."],
    ["Hashtags", "5–8 specific hashtags only. Never 80 copy-pasted. Instagram deprioritised hashtag reach."],
    ["Endings", "Never resolve cleanly. Unresolved endings get saved, rewatched, and shared."],
    ["Reposting", "Do NOT repost the same video. Re-edit completely with a new hook and first 3 seconds."],
    ["Captions", "Never apologise for the Reel. One powerful line + a question that drives comments."],
  ];
  const times = [
    { l:"🥇 Best", t:"9 PM IST", d:"9:30 AM CST", n:"Peak India scrolling" },
    { l:"🥈 Good", t:"1 PM IST", d:"12:30 AM CST", n:"India lunch break" },
    { l:"🥉 Third", t:"8 AM IST", d:"7:30 PM CST", n:"India morning commute" },
  ];
  return (
    <div style={{ paddingBottom:20 }}>
      <div style={{ padding:"40px 20px 30px", background:"linear-gradient(160deg,#200E02 0%,#0C0806 100%)", borderBottom:`1px solid ${T.border}` }}>
        <p style={{ fontFamily:T.sans, fontSize:10, letterSpacing:4, color:T.orange, textTransform:"uppercase", marginBottom:10 }}>@theothersunayana</p>
        <h1 style={{ fontFamily:T.font, fontSize:34, fontWeight:400, color:T.text, lineHeight:1.1, marginBottom:8 }}>Kuchipudi<br/>Creator Studio</h1>
        <p style={{ fontFamily:T.sans, fontSize:12, color:T.muted, lineHeight:1.7 }}>150 scripts · 10 hooks · 150 story moments · power words · full strategy</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:T.border, gap:1, marginBottom:1 }}>
        {[["150","Reel Scripts"],["10","Hook Templates"],["16","Power Words"]].map(([n,l]) => (
          <div key={l} style={{ background:T.bg, padding:"18px 12px", textAlign:"center" }}>
            <div style={{ fontFamily:T.font, fontSize:28, color:T.orange, lineHeight:1 }}>{n}</div>
            <div style={{ fontFamily:T.sans, fontSize:9, color:T.faint, letterSpacing:1, textTransform:"uppercase", marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ padding:"24px 18px 0" }}>
        <p style={{ fontFamily:T.sans, fontSize:10, letterSpacing:3, color:T.faint, textTransform:"uppercase", marginBottom:14 }}>Content Categories</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:28 }}>
          {Object.entries(CAT).map(([k, m]) => (
            <div key={k} style={{ background:T.card, border:`1px solid ${m.c}28`, borderRadius:10, padding:"14px" }}>
              <div style={{ fontSize:18, marginBottom:5 }}>{m.icon}</div>
              <div style={{ fontFamily:T.sans, fontSize:11, fontWeight:600, color:m.c, letterSpacing:1, textTransform:"uppercase", marginBottom:3 }}>{m.label}</div>
              <div style={{ fontFamily:T.sans, fontSize:11, color:T.faint, lineHeight:1.5 }}>
                {k === "STORY" ? "Human moments. Dance is backdrop." : k === "ART" ? "Pure dance showcase." : k === "CONTEXT" ? "Educate non-dancers." : k === "DOUBT" ? "Raw vulnerability." : k === "TREND" ? "Proven formats + your story." : k === "BTS" ? "Behind the scenes." : "Competition arc."}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily:T.sans, fontSize:10, letterSpacing:3, color:T.faint, textTransform:"uppercase", marginBottom:14 }}>⏰ Posting Times — India Audience</p>
        {times.map(t => (
          <div key={t.l} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px", marginBottom:10 }}>
            <div style={{ fontFamily:T.sans, fontSize:12, fontWeight:600, color:"#D4B890", marginBottom:4 }}>{t.l}: {t.t}</div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div style={{ fontFamily:T.sans, fontSize:11, color:T.orange }}>Dallas: {t.d}</div>
              <div style={{ fontFamily:T.sans, fontSize:11, color:T.faint }}>{t.n}</div>
            </div>
          </div>
        ))}

        <p style={{ fontFamily:T.sans, fontSize:10, letterSpacing:3, color:T.faint, textTransform:"uppercase", marginBottom:14, marginTop:24 }}>The Non-Negotiable Rules</p>
        {rules.map(([r, d]) => (
          <div key={r} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px", marginBottom:10 }}>
            <div style={{ fontFamily:T.sans, fontSize:12, fontWeight:600, color:T.orange, marginBottom:4 }}>{r}</div>
            <div style={{ fontFamily:T.sans, fontSize:12, color:T.muted, lineHeight:1.6 }}>{d}</div>
          </div>
        ))}

        <div style={{ background:"#1A0A02", border:`1px solid ${T.orange}40`, borderRadius:10, padding:"16px", marginTop:20 }}>
          <p style={{ fontFamily:T.font, fontSize:16, color:T.orange, lineHeight:1.6, fontStyle:"italic" }}>
            "Post the one that scares you most first. That is always the one that works."
          </p>
        </div>
      </div>
    </div>
  );
}

function Scripts() {
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [copiedId, copy] = useCopy();

  const list = REELS.filter(r => {
    const catOk = filter === "ALL" || r.cat === filter;
    const q = search.toLowerCase();
    const ok = !q || r.title.toLowerCase().includes(q) || r.concept.toLowerCase().includes(q);
    return catOk && ok;
  });

  if (detail) return (
    <div style={{ height:"100%", overflow:"auto", background:T.bg }}>
      <div style={{ position:"sticky", top:0, zIndex:10, background:T.bg, borderBottom:`1px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={() => setDetail(null)} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 12px", color:T.muted, cursor:"pointer", fontFamily:T.sans, fontSize:12 }}>← Back</button>
        <Tag cat={detail.cat} sm />
      </div>
      <div style={{ padding:"20px 18px" }}>
        <div style={{ fontFamily:T.sans, fontSize:10, color:CAT[detail.cat]?.c, letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>REEL #{detail.id}</div>
        <h2 style={{ fontFamily:T.font, fontSize:26, fontWeight:500, color:T.text, marginBottom:20, lineHeight:1.2 }}>{detail.title}</h2>
        {[["Music","music","🎵"],["Concept","concept","💡"],["Dance Style","dance","💃"],["Outfit","outfit","👗"],["Location","location","📍"],["Hook Idea","hook","🎬"],["Caption Idea","caption","✍️"]].map(([l,k,i]) => (
          <Field key={k} label={l} value={detail[k]} icon={i} color={CAT[detail.cat]?.c || T.orange} copiedId={copiedId} onCopy={copy} />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"16px 18px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        <h2 style={{ fontFamily:T.font, fontSize:24, fontWeight:400, color:T.text, marginBottom:12 }}>150 Reel Scripts</h2>
        <input type="text" placeholder="Search by title or concept..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width:"100%", padding:"9px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:T.sans, fontSize:12, color:"#D4B890", marginBottom:10 }} />
        <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:2 }}>
          {["ALL",...Object.keys(CAT)].map(k => {
            const m = CAT[k];
            const active = filter === k;
            return (
              <button key={k} onClick={() => setFilter(k)} style={{
                flexShrink:0, padding:"5px 12px", borderRadius:16, border:"none", cursor:"pointer",
                background: active ? (m?.c || T.orange) : "#1A0F06",
                color: active ? "#fff" : T.faint,
                fontFamily:T.sans, fontSize:10, fontWeight:600, letterSpacing:1,
                textTransform:"uppercase", transition:"all 0.2s",
              }}>{m?.icon || "✦"} {k}</button>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"8px 18px", borderBottom:`1px solid #1A0F06`, flexShrink:0 }}>
        <span style={{ fontFamily:T.sans, fontSize:11, color:T.faint }}>{list.length} of 150 reels</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 18px" }}>
        {list.map(r => (
          <div key={r.id} onClick={() => setDetail(r)}
            style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px", marginBottom:10, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = (CAT[r.cat]?.c || T.orange) + "80"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontFamily:T.sans, fontSize:10, fontWeight:600, color:CAT[r.cat]?.c, opacity:0.6 }}>#{r.id}</span>
                <Tag cat={r.cat} sm />
              </div>
              <span style={{ color:T.faint, fontSize:16 }}>›</span>
            </div>
            <h3 style={{ fontFamily:T.font, fontSize:18, fontWeight:500, color:"#F0E0C0", lineHeight:1.3, marginBottom:6 }}>{r.title}</h3>
            <p style={{ fontFamily:T.sans, fontSize:11, color:T.muted, lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{r.concept}</p>
          </div>
        ))}
        {list.length === 0 && <div style={{ textAlign:"center", padding:"60px 20px", fontFamily:T.sans, fontSize:13, color:T.faint }}>No reels found.</div>}
      </div>
    </div>
  );
}

function Hooks() {
  const [sel, setSel] = useState(HOOKS[0]);
  const [vals, setVals] = useState({});
  const [copiedId, copy] = useCopy();

  const setField = (k, v) => setVals(prev => ({ ...prev, [sel.id]: { ...(prev[sel.id]||{}), [k]: v } }));

  const getResult = () => {
    const v = vals[sel.id] || {};
    let r = sel.formula;
    sel.fields.forEach(f => {
      const val = v[f.k] || f.d;
      r = r.replace(new RegExp(`\\[${f.l.toUpperCase()}\\]`, "gi"), val)
          .replace(new RegExp(`\\[${f.k.toUpperCase()}\\]`, "gi"), val);
    });
    return r;
  };

  const cm = CAT[sel.type] || CAT.STORY;

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"16px 18px 12px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        <h2 style={{ fontFamily:T.font, fontSize:24, fontWeight:400, color:T.text, marginBottom:4 }}>Hook Generator</h2>
        <p style={{ fontFamily:T.sans, fontSize:11, color:T.faint }}>10 templates. Tap to select. Fill in your details.</p>
      </div>
      <div style={{ display:"flex", gap:8, padding:"10px 18px", overflowX:"auto", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        {HOOKS.map(h => {
          const hm = CAT[h.type] || CAT.STORY;
          const active = sel.id === h.id;
          return (
            <button key={h.id} onClick={() => setSel(h)} style={{
              flexShrink:0, padding:"8px 12px", borderRadius:8, cursor:"pointer",
              background: active ? hm.c + "22" : T.card,
              border:`1px solid ${active ? hm.c : T.border}`,
              fontFamily:T.sans, fontSize:10, color: active ? hm.c : T.faint, transition:"all 0.2s",
            }}>
              <div style={{ fontWeight:700, marginBottom:2 }}>#{h.id}</div>
              <div style={{ fontSize:9, whiteSpace:"nowrap" }}>{h.title.split(" ").slice(1,3).join(" ")}</div>
            </button>
          );
        })}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"20px 18px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <Tag cat={sel.type} sm /><span style={{ fontFamily:T.sans, fontSize:11, color:T.muted }}>{sel.trigger}</span>
        </div>
        <h3 style={{ fontFamily:T.font, fontSize:22, fontWeight:500, color:T.text, marginBottom:6 }}>{sel.title}</h3>
        <p style={{ fontFamily:T.sans, fontSize:11, color:T.muted, marginBottom:20, lineHeight:1.6 }}>⚡ {sel.interrupt}</p>

        <div style={{ background:"#0A0603", border:`1px solid ${cm.c}40`, borderLeft:`3px solid ${cm.c}`, borderRadius:"0 8px 8px 0", padding:"12px 16px", marginBottom:16 }}>
          <p style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, color:cm.c, letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Formula</p>
          <p style={{ fontFamily:T.font, fontSize:16, color:"#D4A870", fontStyle:"italic", lineHeight:1.6 }}>"{sel.formula}"</p>
        </div>

        <div style={{ background:"#0F1A10", border:"1px solid #1A3020", borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
          <p style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, color:T.green, letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Example</p>
          <p style={{ fontFamily:T.sans, fontSize:12, color:"#80C090", lineHeight:1.6 }}>"{sel.example}"</p>
        </div>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:"12px 16px", marginBottom:20 }}>
          <p style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, color:T.orange, letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Why It Works</p>
          <p style={{ fontFamily:T.sans, fontSize:12, color:T.muted, lineHeight:1.6 }}>{sel.why}</p>
        </div>

        <p style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, color:cm.c, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>✎ Fill In Your Details</p>
        {sel.fields.map(f => (
          <div key={f.k} style={{ marginBottom:12 }}>
            <label style={{ display:"block", fontFamily:T.sans, fontSize:11, color:T.muted, marginBottom:5 }}>{f.l}</label>
            <input type="text" defaultValue={f.d} onChange={e => setField(f.k, e.target.value)}
              style={{ width:"100%", padding:"9px 12px", background:"#0A0603", border:`1px solid ${T.border}`, borderRadius:8, fontFamily:T.sans, fontSize:12, color:"#D4A870" }} />
          </div>
        ))}

        <div style={{ background:"#0A0603", border:`1px solid ${cm.c}60`, borderRadius:8, padding:"16px", marginTop:20, marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <p style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, color:cm.c, letterSpacing:2, textTransform:"uppercase" }}>Your Hook</p>
            <CopyBtn text={getResult()} id="hook-result" copiedId={copiedId} onCopy={copy} />
          </div>
          <p style={{ fontFamily:T.font, fontSize:18, color:T.text, fontStyle:"italic", lineHeight:1.6 }}>"{getResult()}"</p>
        </div>
      </div>
    </div>
  );
}

function Stories() {
  const [tab, setTab] = useState("story");
  const [openCat, setOpenCat] = useState(null);
  const [copiedId, copy] = useCopy();

  const data = tab === "story" ? STORY_BANK : DOUBT_BANK;

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"16px 18px 12px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        <h2 style={{ fontFamily:T.font, fontSize:24, fontWeight:400, color:T.text, marginBottom:12 }}>Story Bank</h2>
        <div style={{ display:"flex", gap:8 }}>
          {[["story","Story Moments (100)"],["doubt","Doubt Moments (50)"]].map(([k,l]) => (
            <button key={k} onClick={() => { setTab(k); setOpenCat(null); }} style={{
              padding:"7px 16px", borderRadius:20, border:"none", cursor:"pointer",
              background: tab === k ? T.orange : T.card,
              color: tab === k ? "#fff" : T.faint,
              fontFamily:T.sans, fontSize:11, fontWeight:600, transition:"all 0.2s",
            }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 18px" }}>
        <p style={{ fontFamily:T.sans, fontSize:11, color:T.faint, marginBottom:16, lineHeight:1.6 }}>
          {tab === "story" ? "These are real moments from your life. Each one is a Reel waiting to happen." : "No resolution needed. No lesson at the end. Leave it open — that is what gets shared."}
        </p>
        {Object.entries(data).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom:10 }}>
            <button onClick={() => setOpenCat(openCat === cat ? null : cat)} style={{
              width:"100%", background:T.card, border:`1px solid ${T.border}`,
              borderRadius: openCat === cat ? "10px 10px 0 0" : 10,
              padding:"14px 16px", cursor:"pointer", textAlign:"left",
              display:"flex", justifyContent:"space-between", alignItems:"center",
            }}>
              <span style={{ fontFamily:T.sans, fontSize:13, fontWeight:600, color:"#D4B890" }}>{cat}</span>
              <span style={{ color:T.faint, transition:"transform 0.2s", transform: openCat === cat ? "rotate(90deg)" : "none" }}>›</span>
            </button>
            {openCat === cat && (
              <div style={{ border:`1px solid ${T.border}`, borderTop:"none", borderRadius:"0 0 10px 10px", overflow:"hidden" }}>
                {items.map((item, i) => (
                  <div key={i} style={{ padding:"12px 16px", borderTop: i > 0 ? `1px solid #1A0F06` : "none", background:"#0E0804", display:"flex", alignItems:"flex-start", gap:10 }}>
                    <span style={{ fontFamily:T.sans, fontSize:10, fontWeight:600, color:T.orange, flexShrink:0, marginTop:2 }}>{i+1}</span>
                    <p style={{ fontFamily:T.sans, fontSize:12, color:"#C8A878", lineHeight:1.65, flex:1 }}>{item}</p>
                    <CopyBtn text={item} id={cat+i} copiedId={copiedId} onCopy={copy} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Words() {
  const [copiedId, copy] = useCopy();
  const typeColors = { Relief:T.green, Secret:T.purple, Time:T.orange, Tension:T.gold, Curiosity:T.blue, Honesty:T.green, Vulnerability:T.purple, Emotion:T.orange, Milestone:T.gold, Reaction:T.orange, Relatability:T.green, Contrast:T.blue, Exclusivity:T.purple, Anticipation:T.gold, Transformation:T.orange, Authenticity:T.green };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"16px 18px 14px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        <h2 style={{ fontFamily:T.font, fontSize:24, fontWeight:400, color:T.text, marginBottom:6 }}>Power Words</h2>
        <p style={{ fontFamily:T.sans, fontSize:11, color:T.faint, lineHeight:1.6 }}>These words interrupt scrolling behaviour psychologically. Use them in your FIRST 3 WORDS — never buried in the caption.</p>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 18px" }}>
        {POWER_WORDS.map(pw => {
          const tc = typeColors[pw.t] || T.orange;
          return (
            <div key={pw.w} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"16px", marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div>
                  <p style={{ fontFamily:T.font, fontSize:22, color:T.text, fontStyle:"italic", marginBottom:4 }}>"{pw.w}"</p>
                  <span style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, color:tc, letterSpacing:1, textTransform:"uppercase", background: tc+"20", padding:"2px 8px", borderRadius:10 }}>{pw.t}</span>
                </div>
                <CopyBtn text={pw.w} id={pw.w} copiedId={copiedId} onCopy={copy} />
              </div>
              <p style={{ fontFamily:T.sans, fontSize:12, color:T.muted, lineHeight:1.6 }}>{pw.n}</p>
            </div>
          );
        })}

        <div style={{ background:"#1A0A02", border:`1px solid ${T.orange}40`, borderRadius:10, padding:"16px", marginTop:8 }}>
          <p style={{ fontFamily:T.sans, fontSize:10, fontWeight:600, color:T.orange, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>4 Hard Rules</p>
          {[
            ["First 3 words only","Power word must appear in word 1, 2, or 3. Not after a comma. Not in sentence 2."],
            ["Never combine two","'Finally, nobody told me' cancels both. One power word per hook."],
            ["Pair with specificity","'12 years' works. 'A long time' does not. Power words need a specific fact beside them."],
            ["Test the scroll rule","Read your hook. Would a half-asleep stranger stop scrolling? If no — rewrite."],
          ].map(([r,d]) => (
            <div key={r} style={{ marginBottom:12 }}>
              <p style={{ fontFamily:T.sans, fontSize:11, fontWeight:600, color:T.orange, marginBottom:3 }}>{r}</p>
              <p style={{ fontFamily:T.sans, fontSize:11, color:T.muted, lineHeight:1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { height: 100%; background: #0C0806; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #0C0806; }
      ::-webkit-scrollbar-thumb { background: #3A2010; border-radius: 2px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const tabs = [
    { id:"home",  label:"Home",    icon:"🏠" },
    { id:"scripts", label:"Scripts", icon:"🎬" },
    { id:"hooks", label:"Hooks",   icon:"🪝" },
    { id:"stories", label:"Stories", icon:"📖" },
    { id:"words", label:"Words",   icon:"⚡" },
  ];

  const pages = { home: <Home />, scripts: <Scripts />, hooks: <Hooks />, stories: <Stories />, words: <Words /> };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:T.bg, maxWidth:480, margin:"0 auto", position:"relative" }}>
      {/* Content */}
      <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
        {pages[page]}
      </div>

      {/* Bottom Nav */}
      <div style={{
        display:"flex", background:"#0E0803",
        borderTop:`1px solid ${T.border}`,
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        flexShrink:0,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setPage(t.id)} style={{
            flex:1, padding:"10px 4px 12px", background:"none", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", gap:4,
            transition:"all 0.2s",
          }}>
            <span style={{ fontSize:20, lineHeight:1 }}>{t.icon}</span>
            <span style={{ fontFamily:T.sans, fontSize:9, fontWeight:600, letterSpacing:1, textTransform:"uppercase",
              color: page === t.id ? T.orange : T.faint, transition:"color 0.2s" }}>
              {t.label}
            </span>
            {page === t.id && <div style={{ width:16, height:2, background:T.orange, borderRadius:1 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

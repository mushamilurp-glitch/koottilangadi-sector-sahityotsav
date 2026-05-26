import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  /* -------------------- TEAMS -------------------- */
  const teams = [
    "Perinthattiri",
    "Kolapparamba",
    "Padinhattumuri Town",
    "Padinhattumuri West",
    "Padinhattumuri East",
    "Kadoopuram",
    "Unnamthala",
    "Pallippuram",
    "Koottilangadi",
    "Cheloor",
  ];

  for (const name of teams) {
    await prisma.team.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  /* -------------------- CATEGORIES -------------------- */
  const categories = [
    "LP",
    "UP",
    "HS",
    "HSS",
    "Junior",
    "Senior",
    "General",
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Teams & Categories seeded");

  // -------------------- DEFAULT ADMIN --------------------
  const defaultAdminUsername = "mushamilurp@gmail.com";
  const defaultAdminPassword = "Admin@123";
  const defaultPasswordHash = await bcrypt.hash(defaultAdminPassword, 10);

  await prisma.admin.upsert({
    where: { username: defaultAdminUsername },
    update: { passwordHash: defaultPasswordHash },
    create: {
      username: defaultAdminUsername,
      passwordHash: defaultPasswordHash,
      role: "admin",
    },
  });

  console.log("Default admin ensured:", defaultAdminUsername);

  /* -------------------- COMPETITIONS -------------------- */

  const data = {
    LP: [
      "Madh Song",
      "Elocution",
      "Quiz",
      "Story Telling",
      "Pencil Drawing",
      "Water Colouring",
      "Language Game",
      "Reading Malayalam",
      "Reading Arabi-Malayalam",
      "Book Test",
      "Pencil Drawing(Girls)",
      "Water Colouring(Girls)",
      "Hand Writing Malayalam (Girls)",
      "Journal Art (Girls)",
    ],

    UP: [
      "Mappila Song",
      "Elocution",
      "Quiz",
      "Story Telling",
      "Pencil Drawing",
      "Water Colouring",
      "Ganitha Keli",
      "Spelling Bee",
      "Sudoku",
      "Book Test",
      "Story Writing",
      "Pencil Drawing(Girls)",
      "Water Colouring(Girls)",
      "Book Test (Girls)",
      "Story Writing (Girls)",
      "Origami (Girls)",
    ],

    HS: [
      "Madh Song",
      "Mappila Song",
      "Elocution Malayalam",
      "Elocution English",
      "Quiz",
      "Arabic Poem Recitation",
      "Poem Recitation Malayalam",
      "Poem Recitation Urdu",
      "Pencil Drawing",
      "Water Colouring",
      "Language Game English",
      "News Reading",
      "Caption Writing",
      "Book Test",
      "Essay Writing Malayalam",
      "Poem Making",
      "Story Writing",
      "Embroidery (Girls)",
      "Book Test (Girls)",
      "Pencil Drawing(Girls)",
      "Water Colouring(Girls)",
      "Story Writing (Girls)",
      "Poem Making (Girls)",
    ],

    HSS: [
      "Mappila Song",
      "Urdu Poem Recitation",
      "Bhakthi Song",
      "Elocution",
      "Digital Painting",
      "Story Writing",
      "Poem Making",
      "Essay Writing English",
      "Essay Writing Malayalam",
      "Quiz",
      "Pencil Drawing",
      "Water Colouring",
      "News Writing",
      "Calligraphy Arabic",
      "Reel Making",
      "Book Test",
      "Calligraphy Arabic (Girls)",
      "Book Test (Girls)",
      "Story Writing (Girls)",
      "Poem Making (Girls)",
    ],

    Junior: [
      "Sahitya Samvadam",
      "Mappila Song",
      "Elocution Malayalam",
      "Elocution English",
      "Elocution Arabic",
      "Story Writing",
      "Poem Making",
      "Book Test",
      "Essay Writing Malayalam",
      "Essay Writing Arabic",
      "Mudravakya Rachana",
      "Madh Gana Rachana",
      "Quiz",
      "Translation Arabic",
      "Calligraphy Arabic",
      "Social Text",
      "Hadees Musabaqa",
      "AI Poem Making",
      "Reel Making",
      "Podcast",
      "Socio Synapse",
    ],

    Senior: [
      "Political Debate",
      "Mappila Song",
      "Hamd Urdu",
      "Poem Recitation English",
      "Elocution Malayalam",
      "Elocution English",
      "Elocution Urdu",
      "Musha'ara Alfiya",
      "Poem Making",
      "Poem Making English",
      "Story Writing",
      "Book Test",
      "Essay Writing Malayalam",
      "Essay Writing English",
      "Essay Writing Urdu",
      "Translation English",
      "Madh Gana Rachana",
      "Mudravakya Rachana",
      "Quiz",
      "Feature Writing",
      "Social Text",
      "Poster Designing",
      "E-poster",
      "Digital Illustration",
      "Digital Painting",
      "Magazine Layout",
      "Podcast",
    ],

    General: [
      "Spot Magazine",
      "Duff",
      "Arabana",
      "Group Song Cat-A",
      "Group Song Cat-B",
      "Moulid Recitation",
      "Qaseeda Recitation",
      "Viplavagaanam",
      "Chumarezhuth",
      "Malappattu",
      "Risala Quiz",
      "Qawwali",
      "Viplava Gana Rachana",
      "Mappilappattu Rachana",
      "Social Story",
      "Project",
      "Collage",
      "Nasheeda",
      "Family Magazine",
    ],
  };

  for (const categoryName in data) {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) continue;

    for (const compName of data[categoryName as keyof typeof data]) {
      const existingCompetition = await prisma.competition.findFirst({
        where: {
          name: compName,
          categoryId: category.id,
        },
      });

      if (!existingCompetition) {
        await prisma.competition.create({
          data: {
            name: compName,
            categoryId: category.id,
          },
        });
      }
    }
  }

  console.log("Competitions seeded");
  console.log("DONE ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
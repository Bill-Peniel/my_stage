"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.message.deleteMany();
    await prisma.themeTuteur.deleteMany();
    await prisma.demandeStage.deleteMany();
    await prisma.stage.deleteMany();
    await prisma.candidatureScore.deleteMany();
    await prisma.suggestionAffectation.deleteMany();
    await prisma.tuteur.deleteMany();
    await prisma.stagiaire.deleteMany();
    await prisma.structure.deleteMany();
    await prisma.dPAF.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@mystage.com',
            passwordHash: await bcrypt.hash('admin123', 10),
            role: client_1.UserRole.admin,
            isActive: true,
            profile: {
                create: {
                    nom: 'Admin',
                    prenom: 'System',
                    telephone: '+229 00000000'
                }
            }
        }
    });
    const dpafUser = await prisma.user.create({
        data: {
            email: 'dpaf@mystage.com',
            passwordHash: await bcrypt.hash('dpaf123', 10),
            role: client_1.UserRole.dpaf,
            isActive: true,
            profile: {
                create: {
                    nom: 'DPAF',
                    prenom: 'Manager',
                    telephone: '+229 11111111'
                }
            },
            dpaf: {
                create: {}
            }
        }
    });
    const structureData = await prisma.user.create({
        data: {
            email: 'structure@mystage.com',
            passwordHash: await bcrypt.hash('structure123', 10),
            role: client_1.UserRole.structure,
            isActive: true,
            profile: {
                create: {
                    nom: 'Structure',
                    prenom: 'Test',
                    telephone: '+229 22222222'
                }
            },
            structure: {
                create: {
                    nomStructure: 'Structure Test SARL',
                    type: 'Entreprise',
                    adresse: 'Cotonou, Bénin',
                    emailContact: 'contact@structuretest.com',
                    telephoneContact: '+229 33333333'
                }
            }
        },
        include: {
            structure: true
        }
    });
    if (!structureData.structure) {
        throw new Error('La structure n\'a pas été créée correctement');
    }
    const tuteurUser = await prisma.user.create({
        data: {
            email: 'tuteur@mystage.com',
            passwordHash: await bcrypt.hash('tuteur123', 10),
            role: client_1.UserRole.tuteur,
            isActive: true,
            profile: {
                create: {
                    nom: 'Tuteur',
                    prenom: 'Test',
                    telephone: '+229 44444444'
                }
            },
            tuteur: {
                create: {
                    fonction: 'Chef de projet',
                    disponibilite: true,
                    competences: ['JavaScript', 'Node.js', 'React'],
                    structure: {
                        connect: {
                            id: structureData.structure.id
                        }
                    },
                    themes: {
                        create: [
                            {
                                titre: 'Développement Web Frontend',
                                description: 'Stage en développement frontend avec React',
                                disponible: true
                            },
                            {
                                titre: 'Développement Backend Node.js',
                                description: 'Stage en développement backend avec Node.js et Express',
                                disponible: true
                            }
                        ]
                    }
                }
            }
        }
    });
    const stagiaireUser = await prisma.user.create({
        data: {
            email: 'stagiaire@mystage.com',
            passwordHash: await bcrypt.hash('stagiaire123', 10),
            role: client_1.UserRole.stagiaire,
            isActive: true,
            profile: {
                create: {
                    nom: 'Stagiaire',
                    prenom: 'Test',
                    telephone: '+229 55555555'
                }
            },
            stagiaire: {
                create: {
                    codeDemande: 'STG001',
                    statutDemande: 'en_attente',
                    demandesStages: {
                        create: {
                            dateDemande: new Date(),
                            etat: 'en_attente',
                            structureCible: {
                                connect: {
                                    id: structureData.structure.id
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    console.log('Base de données initialisée avec les données de test !');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
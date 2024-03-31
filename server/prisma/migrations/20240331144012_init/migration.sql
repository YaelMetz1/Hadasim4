-- CreateTable
CREATE TABLE "Patient" (
    "patientId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "mobilePhoneNumber" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientId")
);

-- CreateTable
CREATE TABLE "Vaccination" (
    "vaccinationId" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "vaccinationDate" TIMESTAMP(3) NOT NULL,
    "vaccinationProducer" TEXT NOT NULL,

    CONSTRAINT "Vaccination_pkey" PRIMARY KEY ("vaccinationId")
);

-- CreateTable
CREATE TABLE "Illness" (
    "illnessId" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "illnessDate" TIMESTAMP(3) NOT NULL,
    "recoveryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Illness_pkey" PRIMARY KEY ("illnessId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Illness_patientId_key" ON "Illness"("patientId");

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Illness" ADD CONSTRAINT "Illness_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE CASCADE ON UPDATE CASCADE;

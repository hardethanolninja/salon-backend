-- CreateTable
CREATE TABLE "AppointmentServices" (
    "appointmentId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "AppointmentServices_pkey" PRIMARY KEY ("appointmentId","serviceId")
);

-- AddForeignKey
ALTER TABLE "AppointmentServices" ADD CONSTRAINT "AppointmentServices_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentServices" ADD CONSTRAINT "AppointmentServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

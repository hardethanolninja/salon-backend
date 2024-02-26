import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly databaseService: DatabaseService) {}

  //POST create an appointment and link the appointmentServices
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { serviceIds, ...appointmentData } = createAppointmentDto;

    return this.databaseService.appointment.create({
      data: {
        ...appointmentData,
        AppointmentServices: {
          create: serviceIds.map((serviceId) => ({
            service: {
              connect: { id: serviceId },
            },
          })),
        },
      },
    });
  }

  //GET get all appointments, check for status query, return all with services and client
  async findAll(status?: 'Requested' | 'Booked' | 'Completed' | 'Paid') {
    if (status) {
      return this.databaseService.appointment.findMany({
        where: {
          status: status,
        },
        include: {
          AppointmentServices: {
            include: {
              service: true,
            },
          },
          client: true,
        },
      });
    }

    return this.databaseService.appointment.findMany({
      include: {
        AppointmentServices: {
          include: {
            service: true,
          },
        },
        client: true,
      },
    });
  }

  //GET find one appointment by id number
  async findOne(id: number) {
    return this.databaseService.appointment.findUnique({
      where: {
        id: id,
      },
      include: {
        AppointmentServices: {
          include: {
            service: true,
          },
        },
        client: true,
      },
    });
  }

  //GET Find future appointments
  async findFuture(limit?: number) {
    const now = new Date();

    if (limit) {
      return this.databaseService.appointment.findMany({
        where: {
          date_time: {
            gt: now,
          },
        },
        take: +limit,
        include: {
          AppointmentServices: {
            include: {
              service: true,
            },
          },
          client: true,
        },
      });
    }

    return this.databaseService.appointment.findMany({
      where: {
        date_time: {
          gt: now,
        },
      },
      include: {
        AppointmentServices: {
          include: {
            service: true,
          },
        },
        client: true,
      },
    });
  }

  //PATCH updated one appointment by id number
  async update(
    appointmentId: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const { serviceIds, ...appointmentData } = updateAppointmentDto;

    // Update appointment fields
    const updatedAppointment = await this.databaseService.appointment.update({
      where: { id: appointmentId },
      data: {
        ...appointmentData,
        ...(serviceIds && {
          AppointmentServices: {
            // Assuming you want to replace existing service connections
            // This requires deleting existing and creating new ones
            deleteMany: {}, // Deletes all existing connections for this appointment
            create: serviceIds.map((serviceId) => ({
              service: {
                connect: { id: serviceId },
              },
            })),
          },
        }),
      },
      include: {
        AppointmentServices: {
          include: {
            service: true,
          },
        },
        client: true,
      },
    });

    return updatedAppointment;
  }

  //DELETE delete one appointment by id number
  async remove(appointmentId: number) {
    // First, delete related AppointmentServices records
    await this.databaseService.appointmentServices.deleteMany({
      where: { appointmentId: appointmentId },
    });

    // Then, delete the appointment
    return this.databaseService.appointment.delete({
      where: { id: appointmentId },
    });
  }
}

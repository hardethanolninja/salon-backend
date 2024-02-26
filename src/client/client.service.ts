import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createClientDto: Prisma.ClientCreateInput) {
    return this.databaseService.client.create({
      data: createClientDto,
    });
  }

  async findAll() {
    return this.databaseService.client.findMany({
      include: {
        appointments: {
          orderBy: {
            date_time: 'desc',
          },
          take: 10,
        },
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateClientDto: Prisma.ClientUpdateInput) {
    return this.databaseService.client.update({
      where: {
        id: id,
      },
      data: updateClientDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.client.delete({
      where: {
        id: id,
      },
    });
  }
}

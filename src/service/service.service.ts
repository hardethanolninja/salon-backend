import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ServiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createServiceDto: Prisma.ServiceCreateInput) {
    return this.databaseService.service.create({
      data: createServiceDto,
    });
  }

  async findAll() {
    return this.databaseService.service.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.service.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateServiceDto: Prisma.ServiceUpdateInput) {
    return this.databaseService.service.update({
      where: {
        id: id,
      },
      data: updateServiceDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.service.delete({
      where: {
        id: id,
      },
    });
  }
}

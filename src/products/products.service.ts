import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepo.save(createProductDto);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepo.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return await this.productRepo.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    return await this.productRepo.update(id, updateProductDto);
  }

  async remove(id: number): Promise<any> {
    return await this.productRepo.delete(id);
  }
}

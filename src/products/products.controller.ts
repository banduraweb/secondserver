import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() { title, image }: CreateProductDto) {
    const product = await this.productsService.create({ title, image });
    this.client.emit('product_created', product);
    return product;
  }

  @Get()
  async findAll() {
    this.client.emit('hello', 'hello from rabbit');
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() { title, image }: UpdateProductDto,
  ) {
    await this.productsService.update(+id, { title, image });
    const updated = this.productsService.findOne(+id);
    this.client.emit('product_updated', updated);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productsService.remove(+id);
    this.client.emit('product_deleted', +id);
    return result;
  }
  @Post(':id/like')
  async like(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    return this.productsService.update(+id, { likes: product.likes + 1 });
  }
}

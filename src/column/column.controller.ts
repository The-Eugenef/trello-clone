import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('columns')
@UseGuards(AuthGuard)
@Controller('columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new column' })
    @ApiResponse({ status: 201, description: 'The column has been successfully created.' })
    create(@Body() createColumnDto: CreateColumnDto, @Req() req) {
        const userId = req.user.id;
        createColumnDto.userId = userId;

        return this.columnService.create(createColumnDto);
    }


    @Get()
    @ApiOperation({ summary: 'Get all columns' })
    @ApiResponse({ status: 200, description: 'The list of columns.' })
    findAll() {
        return this.columnService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a column by ID' })
    @ApiResponse({ status: 200, description: 'The column.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    findOne(@Param('id') id: number) {
        return this.columnService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a column by ID' })
    @ApiResponse({ status: 200, description: 'The updated column.' })
    @ApiResponse({ status: 404, description: 'Column not found.' })
    async update(@Param('id') id: number, @Body() updateColumnDto: CreateColumnDto, @Req() req) {
        const userId = req.user.id;
        return this.columnService.update(id, updateColumnDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a column by ID' })
    @ApiResponse({ status: 204, description: 'The column has been successfully deleted.' })
    async remove(@Param('id') id: number, @Req() req) {
        const userId = req.user.id;
        return this.columnService.remove(id, userId);
    }

}

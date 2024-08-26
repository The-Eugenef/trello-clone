import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('cards')
@Controller('cards')
@UseGuards(AuthGuard)
export class CardController {
    constructor(private readonly cardService: CardService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new card' })
    @ApiResponse({ status: 201, description: 'The card has been successfully created.' })
    create(@Body() createCardDto: CreateCardDto, @Req() req) {
        createCardDto.userId = req.user.id;
        return this.cardService.create(createCardDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all cards' })
    @ApiResponse({ status: 200, description: 'The list of cards.' })
    findAll() {
        return this.cardService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a card by ID' })
    @ApiResponse({ status: 200, description: 'The card.' })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    findOne(@Param('id') id: number) {
        return this.cardService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a card by ID' })
    @ApiResponse({ status: 200, description: 'The updated card.' })
    @ApiResponse({ status: 404, description: 'Card not found.' })
    @ApiResponse({ status: 403, description: 'You do not have permission to update this card.' })
    async update(@Param('id') id: number, @Body() updateCardDto: CreateCardDto, @Req() req) {
        const userId = req.user.id;
        return this.cardService.update(id, updateCardDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a card by ID' })
    @ApiResponse({ status: 204, description: 'The card has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'You do not have permission to delete this card.' })
    async remove(@Param('id') id: number, @Req() req) {
        const userId = req.user.id;
        return this.cardService.remove(id, userId);
    }
}

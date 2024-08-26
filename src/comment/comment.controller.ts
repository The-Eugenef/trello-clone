import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('comments')
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
    create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
        const userId = req.user.id;
        return this.commentService.create(createCommentDto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all comments' })
    @ApiResponse({ status: 200, description: 'The list of comments.' })
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a comment by ID' })
    @ApiResponse({ status: 200, description: 'The comment.' })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    findOne(@Param('id') id: number) {
        return this.commentService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a comment by ID' })
    @ApiResponse({ status: 200, description: 'The updated comment.' })
    @ApiResponse({ status: 404, description: 'Comment not found.' })
    update(@Param('id') id: number, @Body() updateCommentDto: CreateCommentDto, @Req() req) {
        const userId = req.user.id;
        return this.commentService.update(id, updateCommentDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a comment by ID' })
    @ApiResponse({ status: 204, description: 'The comment has been successfully deleted.' })
    remove(@Param('id') id: number, @Req() req) {
        const userId = req.user.id;
        return this.commentService.remove(id, userId);
    }
}

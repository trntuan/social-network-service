import { MajorService } from './major.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
export declare class MajorController {
    private readonly majorService;
    constructor(majorService: MajorService);
    create(createMajorDto: CreateMajorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMajorDto: UpdateMajorDto): string;
    remove(id: string): string;
}

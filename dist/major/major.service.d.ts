import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
export declare class MajorService {
    create(createMajorDto: CreateMajorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMajorDto: UpdateMajorDto): string;
    remove(id: number): string;
}

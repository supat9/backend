import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Rating } from 'src/common/enums/rating.enum';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1888)
  yearRelease?: number;

  @IsOptional()
  @IsEnum(Rating)
  rating?: Rating;
}

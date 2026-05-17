import { IsEnum, IsInt, IsString, Min, MinLength } from 'class-validator';
import { Rating } from '../../common/enums/rating.enum';

export class CreateMovieDto {
  @IsString()
  @MinLength(1)
  readonly title!: string;

  @IsInt()
  @Min(1888)
  readonly yearRelease!: number;

  @IsEnum(Rating)
  readonly rating!: Rating;
}

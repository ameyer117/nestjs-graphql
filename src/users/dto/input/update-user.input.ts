import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  age?: number;

  @Field()
  @IsOptional()
  isSubscribed?: boolean;
}

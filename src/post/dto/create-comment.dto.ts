export class CreateCommentDto {
  content: string;
  post_id: number;
  parent_id: number | null;
}

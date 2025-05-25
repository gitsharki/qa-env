export class CreateBlogDto {
  readonly title: string = "";
  readonly content: string = "";
  readonly excerpt?: string;
  readonly featuredImage?: string;
  readonly published?: boolean;
  readonly tags?: string[];
}

export class UpdateBlogDto {
  readonly title?: string;
  readonly content?: string;
  readonly excerpt?: string;
  readonly featuredImage?: string;
  readonly published?: boolean;
  readonly publishedAt?: Date;
  readonly tags?: string[];
}

export class BlogResponseDto {
  readonly id: string = "";
  readonly title: string = "";
  readonly content: string = "";
  readonly excerpt: string = "";
  readonly featuredImage?: string;
  readonly published: boolean = false;
  readonly publishedAt?: Date;
  readonly tags: string[] = [];
  readonly viewCount: number = 0;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();
}

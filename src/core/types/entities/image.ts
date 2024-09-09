export type ImageSizeType = `${number}x${number}`;

export enum ImageType {
  Original = 'Original',
  Sizable = 'Sizeable',
}

export enum ImageExtension {
  Jpg = '.jpg',
  Webp = '.webp',
  Png = '.png',
  Svg = '.svg',
}

export interface Image {
  id: string;
  filename: string;
  mimetype: string;
  url: string;
  publicId: string;
  width: number;
  height: number;
  type: ImageType;
  extension: ImageExtension;
  createdAt: Date;
  updatedAt: Date;
}

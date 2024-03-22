export interface ResultPageProps {
  imageId: string | null;
}
export interface AppRouterProps {
  username: string | Blob;
  setUsername: any
}

export interface ImageUploadPageProps {
  username: any;
  onImageUpload: (file: File) => void;
}
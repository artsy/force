import { Override } from "v2/Utils/typeSupport"

type GenericImages<
  T extends { images: Readonly<Array<any | null>> | null }
> = NonNullable<T["images"]>
type GenericImage<
  T extends { images: Readonly<Array<any | null>> | null }
> = Override<NonNullable<GenericImages<T>[number]>, { type: "Image" }>
type GenericVideo<T extends { video: Readonly<any | null> | null }> = Override<
  NonNullable<T["video"]>,
  { type: "Video" }
>
export type GenericFigure<
  T extends {
    images: Readonly<Array<any | null>> | null
    video: Readonly<any | null> | null
  }
> = GenericImage<T> | GenericVideo<T>

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairsIndex_featuredFairs = ReadonlyArray<{
    readonly items: ReadonlyArray<{
        readonly internalID?: string | undefined;
        readonly title?: string | null | undefined;
        readonly image?: {
            readonly cropped: {
                readonly width: number;
                readonly height: number;
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null | undefined;
    } | null> | null;
    readonly " $refType": "FairsIndex_featuredFairs";
}>;
export type FairsIndex_featuredFairs$data = FairsIndex_featuredFairs;
export type FairsIndex_featuredFairs$key = ReadonlyArray<{
    readonly " $data"?: FairsIndex_featuredFairs$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FairsIndex_featuredFairs">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FairsIndex_featuredFairs",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 410
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 547
                    }
                  ],
                  "concreteType": "CroppedImageUrl",
                  "kind": "LinkedField",
                  "name": "cropped",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "width",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "height",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "src",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "srcSet",
                      "storageKey": null
                    }
                  ],
                  "storageKey": "cropped(height:410,width:547)"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "FeaturedLink",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
(node as any).hash = 'cc81fb4953a72c4ccea5b747da589837';
export default node;

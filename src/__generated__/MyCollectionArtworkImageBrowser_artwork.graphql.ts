/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkImageBrowser_artwork = {
    readonly internalID: string;
    readonly images: ReadonlyArray<{
        readonly width: number | null;
        readonly height: number | null;
    } | null> | null;
    readonly figures: ReadonlyArray<{
        readonly internalID?: string | null | undefined;
        readonly isDefault?: boolean | null | undefined;
        readonly type: "Video";
    }>;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowserSmall_artwork" | "ArtworkImageBrowserLarge_artwork">;
    readonly " $refType": "MyCollectionArtworkImageBrowser_artwork";
};
export type MyCollectionArtworkImageBrowser_artwork$data = MyCollectionArtworkImageBrowser_artwork;
export type MyCollectionArtworkImageBrowser_artwork$key = {
    readonly " $data"?: MyCollectionArtworkImageBrowser_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkImageBrowser_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkImageBrowser_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
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
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "figures",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isDefault",
              "storageKey": null
            }
          ],
          "type": "Image",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "type",
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "type": "Video",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowserSmall_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowserLarge_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '00401cec6b53c6db844ded0d1ada0aaa';
export default node;

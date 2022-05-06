/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowser_artwork = {
    readonly internalID: string;
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly isDefault: boolean | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkActions_artwork" | "ArtworkImageBrowserSmall_artwork" | "ArtworkImageBrowserLarge_artwork">;
    readonly " $refType": "ArtworkImageBrowser_artwork";
};
export type ArtworkImageBrowser_artwork$data = ArtworkImageBrowser_artwork;
export type ArtworkImageBrowser_artwork$key = {
    readonly " $data"?: ArtworkImageBrowser_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowser_artwork">;
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
  "name": "ArtworkImageBrowser_artwork",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDefault",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActions_artwork"
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
(node as any).hash = 'e8fb9e7d20d42ae658fa5c0c8e46063f';
export default node;

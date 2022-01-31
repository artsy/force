/**
 * @generated SignedSource<<9fb40a9c993297b1a10137e799122192>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_artwork$data = {
  readonly articles: ReadonlyArray<{
    readonly slug: string | null;
  } | null> | null;
  readonly literature: string | null;
  readonly exhibition_history: string | null;
  readonly provenance: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsAboutTheWorkFromArtsy_artwork" | "ArtworkDetailsAboutTheWorkFromPartner_artwork" | "ArtworkDetailsAdditionalInfo_artwork" | "ArtworkDetailsArticles_artwork">;
  readonly " $fragmentType": "ArtworkDetails_artwork";
};
export type ArtworkDetails_artwork$key = {
  readonly " $data"?: ArtworkDetails_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetails_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetails_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAdditionalInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsArticles_artwork"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "articles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": "articles(size:10)"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "literature",
      "storageKey": "literature(format:\"HTML\")"
    },
    {
      "alias": "exhibition_history",
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "exhibitionHistory",
      "storageKey": "exhibitionHistory(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "provenance",
      "storageKey": "provenance(format:\"HTML\")"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "ea24475efa27d1d663735de4d3c074f2";

export default node;

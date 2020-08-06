/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_artwork = {
    readonly articles: ReadonlyArray<{
        readonly slug: string | null;
    } | null> | null;
    readonly literature: string | null;
    readonly exhibition_history: string | null;
    readonly provenance: string | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsAboutTheWorkFromArtsy_artwork" | "ArtworkDetailsAboutTheWorkFromPartner_artwork" | "ArtworkDetailsAdditionalInfo_artwork" | "ArtworkDetailsArticles_artwork">;
    readonly " $refType": "ArtworkDetails_artwork";
};
export type ArtworkDetails_artwork$data = ArtworkDetails_artwork;
export type ArtworkDetails_artwork$key = {
    readonly " $data"?: ArtworkDetails_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_artwork">;
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
  "kind": "Fragment",
  "name": "ArtworkDetails_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "articles",
      "storageKey": "articles(size:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Article",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "literature",
      "args": (v0/*: any*/),
      "storageKey": "literature(format:\"HTML\")"
    },
    {
      "kind": "ScalarField",
      "alias": "exhibition_history",
      "name": "exhibitionHistory",
      "args": (v0/*: any*/),
      "storageKey": "exhibitionHistory(format:\"HTML\")"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "provenance",
      "args": (v0/*: any*/),
      "storageKey": "provenance(format:\"HTML\")"
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAboutTheWorkFromPartner_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsAdditionalInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetailsArticles_artwork",
      "args": null
    }
  ]
};
})();
(node as any).hash = 'ea24475efa27d1d663735de4d3c074f2';
export default node;

/**
 * @generated SignedSource<<b0e14f77e9a1943d49221332572ea033>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CareerHighlightsStepsQuery$variables = Record<PropertyKey, never>;
export type CareerHighlightsStepsQuery$data = {
  readonly me: {
    readonly myCollectionInfo: {
      readonly BIENNIAL: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
      }>;
      readonly COLLECTED: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
      }>;
      readonly GROUP_SHOW: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
      }>;
      readonly REVIEWED: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
      }>;
      readonly SOLO_SHOW: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CareerHighlightModalStep_careerHighlight">;
      }>;
    } | null | undefined;
  } | null | undefined;
};
export type CareerHighlightsStepsQuery = {
  response: CareerHighlightsStepsQuery$data;
  variables: CareerHighlightsStepsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": "BIENNIAL"
  }
],
v1 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "CareerHighlightModalStep_careerHighlight"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": "COLLECTED"
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": "GROUP_SHOW"
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": "REVIEWED"
  }
],
v5 = [
  {
    "kind": "Literal",
    "name": "kind",
    "value": "SOLO_SHOW"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Artist",
    "kind": "LinkedField",
    "name": "artist",
    "plural": false,
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
        "name": "href",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "initials",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "formattedNationalityAndBirthday",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ArtistCounts",
        "kind": "LinkedField",
        "name": "counts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworks",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "forSaleArtworks",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "coverArtwork",
        "plural": false,
        "selections": [
          {
            "alias": "avatar",
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
                    "value": 45
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 45
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
                "storageKey": "cropped(height:45,width:45)"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      (v6/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CareerHighlightsStepsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": "BIENNIAL",
                "args": (v0/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v1/*: any*/),
                "storageKey": "artistInsights(kind:\"BIENNIAL\")"
              },
              {
                "alias": "COLLECTED",
                "args": (v2/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v1/*: any*/),
                "storageKey": "artistInsights(kind:\"COLLECTED\")"
              },
              {
                "alias": "GROUP_SHOW",
                "args": (v3/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v1/*: any*/),
                "storageKey": "artistInsights(kind:\"GROUP_SHOW\")"
              },
              {
                "alias": "REVIEWED",
                "args": (v4/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v1/*: any*/),
                "storageKey": "artistInsights(kind:\"REVIEWED\")"
              },
              {
                "alias": "SOLO_SHOW",
                "args": (v5/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v1/*: any*/),
                "storageKey": "artistInsights(kind:\"SOLO_SHOW\")"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CareerHighlightsStepsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": "BIENNIAL",
                "args": (v0/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "artistInsights(kind:\"BIENNIAL\")"
              },
              {
                "alias": "COLLECTED",
                "args": (v2/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "artistInsights(kind:\"COLLECTED\")"
              },
              {
                "alias": "GROUP_SHOW",
                "args": (v3/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "artistInsights(kind:\"GROUP_SHOW\")"
              },
              {
                "alias": "REVIEWED",
                "args": (v4/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "artistInsights(kind:\"REVIEWED\")"
              },
              {
                "alias": "SOLO_SHOW",
                "args": (v5/*: any*/),
                "concreteType": "ArtistInsight",
                "kind": "LinkedField",
                "name": "artistInsights",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "artistInsights(kind:\"SOLO_SHOW\")"
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c8a99fb2163a08f786687999d7d002c4",
    "id": null,
    "metadata": {},
    "name": "CareerHighlightsStepsQuery",
    "operationKind": "query",
    "text": "query CareerHighlightsStepsQuery {\n  me {\n    myCollectionInfo {\n      BIENNIAL: artistInsights(kind: BIENNIAL) {\n        ...CareerHighlightModalStep_careerHighlight\n      }\n      COLLECTED: artistInsights(kind: COLLECTED) {\n        ...CareerHighlightModalStep_careerHighlight\n      }\n      GROUP_SHOW: artistInsights(kind: GROUP_SHOW) {\n        ...CareerHighlightModalStep_careerHighlight\n      }\n      REVIEWED: artistInsights(kind: REVIEWED) {\n        ...CareerHighlightModalStep_careerHighlight\n      }\n      SOLO_SHOW: artistInsights(kind: SOLO_SHOW) {\n        ...CareerHighlightModalStep_careerHighlight\n      }\n    }\n    id\n  }\n}\n\nfragment CareerHighlightModalStep_careerHighlight on ArtistInsight {\n  artist {\n    ...EntityHeaderArtist_artist\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3625215b2911755ecc820b577bdd83fa";

export default node;

/**
 * @generated SignedSource<<fa8a29d22cac7f2207c51baa4b4772b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionEditArtworkTest_Query$variables = {
  slug: string;
};
export type MyCollectionEditArtworkTest_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionEditArtwork_artwork">;
  } | null | undefined;
};
export type MyCollectionEditArtworkTest_Query = {
  response: MyCollectionEditArtworkTest_Query$data;
  variables: MyCollectionEditArtworkTest_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionEditArtworkTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionEditArtwork_artwork"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MyCollectionEditArtworkTest_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initials",
                "storageKey": null
              },
              (v3/*: any*/),
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
                "concreteType": "ArtistTargetSupply",
                "kind": "LinkedField",
                "name": "targetSupply",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isP1",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPersonalArtist",
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
                        "value": 44
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 44
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": "cropped(height:44,width:44)"
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "inProgress",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "pricePaid",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "display",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currencyCode",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "in",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cm",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionSize",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionNumber",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDefault",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageURL",
                "storageKey": null
              },
              (v5/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEdition",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "metric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
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
            "name": "title",
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "confidentialNotes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "collectorLocation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "countryCode",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f0d8da4be5dda5df003d80a8f8fe0ab4",
    "id": null,
    "metadata": {},
    "name": "MyCollectionEditArtworkTest_Query",
    "operationKind": "query",
    "text": "query MyCollectionEditArtworkTest_Query(\n  $slug: String!\n) {\n  artwork(id: $slug) {\n    ...MyCollectionEditArtwork_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkFormMain_artwork on Artwork {\n  internalID\n  slug\n}\n\nfragment MyCollectionEditArtwork_artwork on Artwork {\n  artist {\n    internalID\n    initials\n    name\n    formattedNationalityAndBirthday\n    targetSupply {\n      isP1\n    }\n    isPersonalArtist\n    image {\n      cropped(width: 44, height: 44) {\n        height\n        src\n        srcSet\n        width\n      }\n    }\n    id\n  }\n  consignmentSubmission {\n    inProgress\n  }\n  artistNames\n  category\n  pricePaid {\n    display\n    minor\n    currencyCode\n  }\n  date\n  depth\n  dimensions {\n    in\n    cm\n  }\n  editionSize\n  editionNumber\n  height\n  attributionClass {\n    name\n    id\n  }\n  id\n  images {\n    internalID\n    isDefault\n    imageURL\n    width\n    height\n  }\n  internalID\n  isEdition\n  medium\n  metric\n  provenance\n  slug\n  title\n  width\n  confidentialNotes\n  collectorLocation {\n    city\n    state\n    country\n    countryCode\n    id\n  }\n  ...MyCollectionArtworkFormMain_artwork\n}\n"
  }
};
})();

(node as any).hash = "f4cad1801f4d15e9aa177810173ab811";

export default node;

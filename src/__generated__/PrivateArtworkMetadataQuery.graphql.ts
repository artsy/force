/**
 * @generated SignedSource<<edcc932dd8ffc2f8704ddf53f95ddb61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkMetadataQuery$variables = Record<PropertyKey, never>;
export type PrivateArtworkMetadataQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkMetadata_artwork">;
  } | null | undefined;
};
export type PrivateArtworkMetadataQuery = {
  response: PrivateArtworkMetadataQuery$data;
  variables: PrivateArtworkMetadataQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "label",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
],
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "framedDimensions",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrivateArtworkMetadataQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PrivateArtworkMetadata_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PrivateArtworkMetadataQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "series",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "publisher",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "manufacturer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageRights",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "canRequestLotConditionsReport",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isUnlisted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v5/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "signatureInfo",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "longDescription",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v6/*: any*/)
            ],
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
            "args": (v8/*: any*/),
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": "provenance(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "kind": "ScalarField",
            "name": "exhibitionHistory",
            "storageKey": "exhibitionHistory(format:\"HTML\")"
          },
          (v6/*: any*/)
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "73407da4c1205a59542d6268018b7d6f",
    "id": null,
    "metadata": {},
    "name": "PrivateArtworkMetadataQuery",
    "operationKind": "query",
    "text": "query PrivateArtworkMetadataQuery {\n  artwork(id: \"foo\") {\n    ...PrivateArtworkMetadata_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  imageRights\n  canRequestLotConditionsReport\n  internalID\n  isUnlisted\n  framed {\n    label\n    details\n  }\n  framedDimensions {\n    in\n    cm\n  }\n  editionSets {\n    internalID\n    dimensions {\n      in\n      cm\n    }\n    framedDimensions {\n      in\n      cm\n    }\n    id\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  dimensions {\n    in\n    cm\n  }\n  attributionClass {\n    name\n    id\n  }\n  medium\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n\nfragment PrivateArtworkMetadata_artwork on Artwork {\n  ...ArtworkDetailsAdditionalInfo_artwork\n  conditionDescription {\n    details\n  }\n  provenance(format: HTML)\n  exhibitionHistory(format: HTML)\n}\n"
  }
};
})();

(node as any).hash = "abc40414095f0f3a259a9af13006c804";

export default node;

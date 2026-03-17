/**
 * @generated SignedSource<<7229fde9bce5c7a6b4996898512df7f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsTestQuery$variables = Record<PropertyKey, never>;
export type ArtworkDetailsTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetails_artwork">;
  } | null | undefined;
};
export type ArtworkDetailsTestQuery = {
  response: ArtworkDetailsTestQuery$data;
  variables: ArtworkDetailsTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = [
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
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "framedDimensions",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetailsTestQuery",
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
            "name": "ArtworkDetails_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkDetailsTestQuery",
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
            "alias": "descriptionHTML",
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "alias": "additionalInformationHTML",
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "additionalInformation",
            "storageKey": "additionalInformation(format:\"HTML\")"
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
          (v2/*: any*/),
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionSet",
            "kind": "LinkedField",
            "name": "editionSets",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/)
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v3/*: any*/),
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
              (v8/*: any*/),
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
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v7/*: any*/)
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
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "literature",
            "storageKey": "literature(format:\"HTML\")"
          },
          {
            "alias": "exhibition_history",
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "exhibitionHistory",
            "storageKey": "exhibitionHistory(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": "provenance(format:\"HTML\")"
          },
          (v7/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "e4132e085d63bde5c90f0a27ae87c8d6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.additionalInformationHTML": (v9/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v10/*: any*/),
        "artwork.attributionClass.name": (v9/*: any*/),
        "artwork.canRequestLotConditionsReport": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.category": (v9/*: any*/),
        "artwork.certificateOfAuthenticity": (v11/*: any*/),
        "artwork.certificateOfAuthenticity.details": (v9/*: any*/),
        "artwork.certificateOfAuthenticity.label": (v9/*: any*/),
        "artwork.conditionDescription": (v11/*: any*/),
        "artwork.conditionDescription.details": (v9/*: any*/),
        "artwork.conditionDescription.label": (v9/*: any*/),
        "artwork.descriptionHTML": (v9/*: any*/),
        "artwork.dimensions": (v12/*: any*/),
        "artwork.dimensions.cm": (v9/*: any*/),
        "artwork.dimensions.in": (v9/*: any*/),
        "artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "artwork.editionSets.dimensions": (v12/*: any*/),
        "artwork.editionSets.dimensions.cm": (v9/*: any*/),
        "artwork.editionSets.dimensions.in": (v9/*: any*/),
        "artwork.editionSets.framedDimensions": (v12/*: any*/),
        "artwork.editionSets.framedDimensions.cm": (v9/*: any*/),
        "artwork.editionSets.framedDimensions.in": (v9/*: any*/),
        "artwork.editionSets.id": (v10/*: any*/),
        "artwork.editionSets.internalID": (v10/*: any*/),
        "artwork.exhibition_history": (v9/*: any*/),
        "artwork.framed": (v11/*: any*/),
        "artwork.framed.details": (v9/*: any*/),
        "artwork.framed.label": (v9/*: any*/),
        "artwork.framedDimensions": (v12/*: any*/),
        "artwork.framedDimensions.cm": (v9/*: any*/),
        "artwork.framedDimensions.in": (v9/*: any*/),
        "artwork.id": (v10/*: any*/),
        "artwork.imageRights": (v9/*: any*/),
        "artwork.internalID": (v10/*: any*/),
        "artwork.isUnlisted": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.literature": (v9/*: any*/),
        "artwork.manufacturer": (v9/*: any*/),
        "artwork.medium": (v9/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artwork.mediumType.longDescription": (v9/*: any*/),
        "artwork.mediumType.name": (v9/*: any*/),
        "artwork.provenance": (v9/*: any*/),
        "artwork.publisher": (v9/*: any*/),
        "artwork.series": (v9/*: any*/),
        "artwork.signatureInfo": (v11/*: any*/),
        "artwork.signatureInfo.details": (v9/*: any*/),
        "artwork.signatureInfo.label": (v9/*: any*/),
        "artwork.slug": (v10/*: any*/)
      }
    },
    "name": "ArtworkDetailsTestQuery",
    "operationKind": "query",
    "text": "query ArtworkDetailsTestQuery {\n  artwork(id: \"example\") {\n    ...ArtworkDetails_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {\n  descriptionHTML: description(format: HTML)\n  additionalInformationHTML: additionalInformation(format: HTML)\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  imageRights\n  canRequestLotConditionsReport\n  internalID\n  isUnlisted\n  framed {\n    label\n    details\n  }\n  framedDimensions {\n    in\n    cm\n  }\n  editionSets {\n    internalID\n    dimensions {\n      in\n      cm\n    }\n    framedDimensions {\n      in\n      cm\n    }\n    id\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  dimensions {\n    in\n    cm\n  }\n  attributionClass {\n    name\n    id\n  }\n  medium\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n\nfragment ArtworkDetails_artwork on Artwork {\n  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork\n  ...ArtworkDetailsAdditionalInfo_artwork\n  slug\n  literature(format: HTML)\n  exhibition_history: exhibitionHistory(format: HTML)\n  provenance(format: HTML)\n}\n"
  }
};
})();

(node as any).hash = "37f5a231652d0c55f6587bf946979344";

export default node;

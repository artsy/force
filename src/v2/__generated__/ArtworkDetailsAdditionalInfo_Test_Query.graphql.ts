/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsAdditionalInfo_Test_QueryVariables = {};
export type ArtworkDetailsAdditionalInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsAdditionalInfo_artwork">;
    } | null;
};
export type ArtworkDetailsAdditionalInfo_Test_Query = {
    readonly response: ArtworkDetailsAdditionalInfo_Test_QueryResponse;
    readonly variables: ArtworkDetailsAdditionalInfo_Test_QueryVariables;
};



/*
query ArtworkDetailsAdditionalInfo_Test_Query {
  artwork(id: "xxx") {
    ...ArtworkDetailsAdditionalInfo_artwork
    id
  }
}

fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
  category
  series
  publisher
  manufacturer
  image_rights: imageRights
  canRequestLotConditionsReport
  internalID
  framed {
    label
    details
  }
  signatureInfo {
    label
    details
  }
  conditionDescription {
    label
    details
  }
  certificateOfAuthenticity {
    label
    details
  }
  mediumType {
    __typename
  }
  ...ArtworkDetailsMediumModal_artwork
}

fragment ArtworkDetailsMediumModal_artwork on Artwork {
  mediumType {
    name
    longDescription
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = [
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
v2 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "ArtworkInfoRow",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetailsAdditionalInfo_Test_Query",
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
            "name": "ArtworkDetailsAdditionalInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkDetailsAdditionalInfo_Test_Query",
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
            "alias": "image_rights",
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
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "signatureInfo",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "certificateOfAuthenticity",
            "plural": false,
            "selections": (v1/*: any*/),
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
                "name": "longDescription",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.category": (v2/*: any*/),
        "artwork.series": (v2/*: any*/),
        "artwork.publisher": (v2/*: any*/),
        "artwork.manufacturer": (v2/*: any*/),
        "artwork.image_rights": (v2/*: any*/),
        "artwork.canRequestLotConditionsReport": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.internalID": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.framed": (v3/*: any*/),
        "artwork.signatureInfo": (v3/*: any*/),
        "artwork.conditionDescription": (v3/*: any*/),
        "artwork.certificateOfAuthenticity": (v3/*: any*/),
        "artwork.mediumType": {
          "type": "ArtworkMedium",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artwork.framed.label": (v2/*: any*/),
        "artwork.framed.details": (v2/*: any*/),
        "artwork.signatureInfo.label": (v2/*: any*/),
        "artwork.signatureInfo.details": (v2/*: any*/),
        "artwork.conditionDescription.label": (v2/*: any*/),
        "artwork.conditionDescription.details": (v2/*: any*/),
        "artwork.certificateOfAuthenticity.label": (v2/*: any*/),
        "artwork.certificateOfAuthenticity.details": (v2/*: any*/),
        "artwork.mediumType.__typename": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "artwork.mediumType.name": (v2/*: any*/),
        "artwork.mediumType.longDescription": (v2/*: any*/)
      }
    },
    "name": "ArtworkDetailsAdditionalInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkDetailsAdditionalInfo_Test_Query {\n  artwork(id: \"xxx\") {\n    ...ArtworkDetailsAdditionalInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  image_rights: imageRights\n  canRequestLotConditionsReport\n  internalID\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e0f7252c95c40eaddf28cc6d72e341aa';
export default node;

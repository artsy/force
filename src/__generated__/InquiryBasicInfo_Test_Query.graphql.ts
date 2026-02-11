/**
 * @generated SignedSource<<7e08cf43503a9b989c4d525c46563333>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InquiryBasicInfo_Test_Query$variables = Record<PropertyKey, never>;
export type InquiryBasicInfo_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"InquiryBasicInfo_artwork">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"InquiryBasicInfo_me">;
  } | null | undefined;
};
export type InquiryBasicInfo_Test_Query = {
  response: InquiryBasicInfo_Test_Query$data;
  variables: InquiryBasicInfo_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryBasicInfo_Test_Query",
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
            "name": "InquiryBasicInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InquiryBasicInfo_me"
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
    "name": "InquiryBasicInfo_Test_Query",
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "location",
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
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "otherRelevantPositions",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "profession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CollectorProfileType",
            "kind": "LinkedField",
            "name": "collectorProfile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "instagram",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "linkedIn",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ab19458edf53bec1b4b3d092d6f56bc1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v3/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v3/*: any*/),
        "artwork.partner.name": (v4/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.collectorProfile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorProfileType"
        },
        "me.collectorProfile.id": (v3/*: any*/),
        "me.collectorProfile.instagram": (v4/*: any*/),
        "me.collectorProfile.linkedIn": (v4/*: any*/),
        "me.id": (v3/*: any*/),
        "me.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "me.location.city": (v4/*: any*/),
        "me.location.country": (v4/*: any*/),
        "me.location.display": (v4/*: any*/),
        "me.location.id": (v3/*: any*/),
        "me.location.state": (v4/*: any*/),
        "me.name": (v4/*: any*/),
        "me.otherRelevantPositions": (v4/*: any*/),
        "me.profession": (v4/*: any*/)
      }
    },
    "name": "InquiryBasicInfo_Test_Query",
    "operationKind": "query",
    "text": "query InquiryBasicInfo_Test_Query {\n  artwork(id: \"example\") {\n    ...InquiryBasicInfo_artwork\n    id\n  }\n  me {\n    ...InquiryBasicInfo_me\n    id\n  }\n}\n\nfragment InquiryBasicInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n}\n\nfragment InquiryBasicInfo_me on Me {\n  name\n  location {\n    display\n    city\n    state\n    country\n    id\n  }\n  otherRelevantPositions\n  profession\n  collectorProfile {\n    instagram\n    linkedIn\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "365e94690199b0fa004e41d220f5bfac";

export default node;

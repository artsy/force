/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowContextualLink_Test_QueryVariables = {};
export type ShowContextualLink_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowContextualLink_show">;
    } | null;
};
export type ShowContextualLink_Test_Query = {
    readonly response: ShowContextualLink_Test_QueryResponse;
    readonly variables: ShowContextualLink_Test_QueryVariables;
};



/*
query ShowContextualLink_Test_Query {
  show(id: "catty-show") {
    ...ShowContextualLink_show
    id
  }
}

fragment ShowContextualLink_show on Show {
  isFairBooth
  fair {
    href
    isActive
    name
    id
  }
  partner {
    __typename
    ... on Partner {
      isLinkable
      name
      href
    }
    ... on Node {
      id
    }
    ... on ExternalPartner {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "catty-show"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowContextualLink_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowContextualLink_show"
          }
        ],
        "storageKey": "show(id:\"catty-show\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowContextualLink_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFairBooth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Fair",
            "kind": "LinkedField",
            "name": "fair",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isActive",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLinkable",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v1/*: any*/)
                ],
                "type": "Partner"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "show(id:\"catty-show\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "type": "Show",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.id": (v4/*: any*/),
        "show.isFairBooth": (v5/*: any*/),
        "show.fair": {
          "type": "Fair",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.partner": {
          "type": "PartnerTypes",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.fair.href": (v6/*: any*/),
        "show.fair.isActive": (v5/*: any*/),
        "show.fair.name": (v6/*: any*/),
        "show.fair.id": (v4/*: any*/),
        "show.partner.isLinkable": (v5/*: any*/),
        "show.partner.name": (v6/*: any*/),
        "show.partner.href": (v6/*: any*/),
        "show.partner.id": (v4/*: any*/)
      }
    },
    "name": "ShowContextualLink_Test_Query",
    "operationKind": "query",
    "text": "query ShowContextualLink_Test_Query {\n  show(id: \"catty-show\") {\n    ...ShowContextualLink_show\n    id\n  }\n}\n\nfragment ShowContextualLink_show on Show {\n  isFairBooth\n  fair {\n    href\n    isActive\n    name\n    id\n  }\n  partner {\n    __typename\n    ... on Partner {\n      isLinkable\n      name\n      href\n    }\n    ... on Node {\n      id\n    }\n    ... on ExternalPartner {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '99309c83e601be361e29c019231a8976';
export default node;

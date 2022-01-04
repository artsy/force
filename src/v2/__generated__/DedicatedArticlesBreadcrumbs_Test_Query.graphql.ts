/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DedicatedArticlesBreadcrumbs_Test_QueryVariables = {};
export type DedicatedArticlesBreadcrumbs_Test_QueryResponse = {
    readonly fairOrganizer: {
        readonly " $fragmentRefs": FragmentRefs<"DedicatedArticlesBreadcrumbs_fairOrganizer">;
    } | null;
};
export type DedicatedArticlesBreadcrumbs_Test_Query = {
    readonly response: DedicatedArticlesBreadcrumbs_Test_QueryResponse;
    readonly variables: DedicatedArticlesBreadcrumbs_Test_QueryVariables;
};



/*
query DedicatedArticlesBreadcrumbs_Test_Query {
  fairOrganizer(id: "example") {
    ...DedicatedArticlesBreadcrumbs_fairOrganizer
    id
  }
}

fragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {
  slug
  name
  profile {
    image {
      resized(width: 30, height: 30, version: "square") {
        src
        srcSet
      }
    }
    id
  }
}
*/

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
  "name": "id",
  "storageKey": null
},
v2 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DedicatedArticlesBreadcrumbs_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DedicatedArticlesBreadcrumbs_fairOrganizer"
          }
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DedicatedArticlesBreadcrumbs_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "FairOrganizer",
        "kind": "LinkedField",
        "name": "fairOrganizer",
        "plural": false,
        "selections": [
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
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
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
                        "value": 30
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 30
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
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
                    "storageKey": "resized(height:30,version:\"square\",width:30)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "fairOrganizer(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fairOrganizer": {
          "type": "FairOrganizer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.id": (v2/*: any*/),
        "fairOrganizer.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "fairOrganizer.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile.id": (v2/*: any*/),
        "fairOrganizer.profile.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "fairOrganizer.profile.image.resized.src": (v3/*: any*/),
        "fairOrganizer.profile.image.resized.srcSet": (v3/*: any*/)
      }
    },
    "name": "DedicatedArticlesBreadcrumbs_Test_Query",
    "operationKind": "query",
    "text": "query DedicatedArticlesBreadcrumbs_Test_Query {\n  fairOrganizer(id: \"example\") {\n    ...DedicatedArticlesBreadcrumbs_fairOrganizer\n    id\n  }\n}\n\nfragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {\n  slug\n  name\n  profile {\n    image {\n      resized(width: 30, height: 30, version: \"square\") {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'afa30fa8497e508d19f3bc05ee3a7a75';
export default node;

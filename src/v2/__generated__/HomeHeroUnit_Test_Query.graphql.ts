/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnit_Test_QueryVariables = {};
export type HomeHeroUnit_Test_QueryResponse = {
    readonly homePage: {
        readonly heroUnits: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"HomeHeroUnit_heroUnit">;
        } | null> | null;
    } | null;
};
export type HomeHeroUnit_Test_Query = {
    readonly response: HomeHeroUnit_Test_QueryResponse;
    readonly variables: HomeHeroUnit_Test_QueryVariables;
};



/*
query HomeHeroUnit_Test_Query {
  homePage {
    heroUnits(platform: DESKTOP) {
      ...HomeHeroUnit_heroUnit
      id
    }
  }
}

fragment HomeHeroUnit_heroUnit on HomePageHeroUnit {
  backgroundImageURL
  heading
  title
  subtitle
  linkText
  href
  creditLine
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "platform",
    "value": "DESKTOP"
  }
],
v1 = {
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
    "name": "HomeHeroUnit_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "HomePageHeroUnit",
            "kind": "LinkedField",
            "name": "heroUnits",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HomeHeroUnit_heroUnit"
              }
            ],
            "storageKey": "heroUnits(platform:\"DESKTOP\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeHeroUnit_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "HomePageHeroUnit",
            "kind": "LinkedField",
            "name": "heroUnits",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "backgroundImageURL",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heading",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "subtitle",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "linkText",
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
                "name": "creditLine",
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
            "storageKey": "heroUnits(platform:\"DESKTOP\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "homePage": {
          "type": "HomePage",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "homePage.heroUnits": {
          "type": "HomePageHeroUnit",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "homePage.heroUnits.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "homePage.heroUnits.backgroundImageURL": (v1/*: any*/),
        "homePage.heroUnits.heading": (v1/*: any*/),
        "homePage.heroUnits.title": (v1/*: any*/),
        "homePage.heroUnits.subtitle": (v1/*: any*/),
        "homePage.heroUnits.linkText": (v1/*: any*/),
        "homePage.heroUnits.href": (v1/*: any*/),
        "homePage.heroUnits.creditLine": (v1/*: any*/)
      }
    },
    "name": "HomeHeroUnit_Test_Query",
    "operationKind": "query",
    "text": "query HomeHeroUnit_Test_Query {\n  homePage {\n    heroUnits(platform: DESKTOP) {\n      ...HomeHeroUnit_heroUnit\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HomePageHeroUnit {\n  backgroundImageURL\n  heading\n  title\n  subtitle\n  linkText\n  href\n  creditLine\n}\n"
  }
};
})();
(node as any).hash = 'ce2de92aeb13b3f33c94c8b628f88848';
export default node;

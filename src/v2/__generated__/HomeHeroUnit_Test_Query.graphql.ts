/**
 * @generated SignedSource<<77fab22b73f84905d3d9e907c1819bdc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeHeroUnit_Test_Query$variables = {};
export type HomeHeroUnit_Test_Query$data = {
  readonly homePage: {
    readonly heroUnits: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnit_heroUnit">;
    } | null> | null;
  } | null;
};
export type HomeHeroUnit_Test_Query = {
  variables: HomeHeroUnit_Test_Query$variables;
  response: HomeHeroUnit_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "platform",
    "value": "DESKTOP"
  }
],
v1 = {
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
    "type": "Query",
    "abstractKey": null
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
    "cacheID": "817f70b8c004ebb48ca5b7b3543f8947",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "homePage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HomePage"
        },
        "homePage.heroUnits": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "HomePageHeroUnit"
        },
        "homePage.heroUnits.backgroundImageURL": (v1/*: any*/),
        "homePage.heroUnits.creditLine": (v1/*: any*/),
        "homePage.heroUnits.heading": (v1/*: any*/),
        "homePage.heroUnits.href": (v1/*: any*/),
        "homePage.heroUnits.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "homePage.heroUnits.linkText": (v1/*: any*/),
        "homePage.heroUnits.subtitle": (v1/*: any*/),
        "homePage.heroUnits.title": (v1/*: any*/)
      }
    },
    "name": "HomeHeroUnit_Test_Query",
    "operationKind": "query",
    "text": "query HomeHeroUnit_Test_Query {\n  homePage {\n    heroUnits(platform: DESKTOP) {\n      ...HomeHeroUnit_heroUnit\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HomePageHeroUnit {\n  backgroundImageURL\n  heading\n  title\n  subtitle\n  linkText\n  href\n  creditLine\n}\n"
  }
};
})();

(node as any).hash = "ce2de92aeb13b3f33c94c8b628f88848";

export default node;

/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsRailQueryVariables = {
    showOnEditorial?: boolean | null;
    size?: number | null;
    randomizationSeed?: string | null;
};
export type CollectionsRailQueryResponse = {
    readonly collections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"CollectionsRail_collections">;
    }>;
};
export type CollectionsRailQuery = {
    readonly response: CollectionsRailQueryResponse;
    readonly variables: CollectionsRailQueryVariables;
};



/*
query CollectionsRailQuery(
  $showOnEditorial: Boolean
  $size: Int
  $randomizationSeed: String
) {
  collections: marketingCollections(showOnEditorial: $showOnEditorial, size: $size, randomizationSeed: $randomizationSeed) {
    ...CollectionsRail_collections
    id
  }
}

fragment CollectionEntity_collection on MarketingCollection {
  slug
  headerImage
  title
  price_guidance: priceGuidance
  show_on_editorial: showOnEditorial
}

fragment CollectionsRail_collections on MarketingCollection {
  ...CollectionEntity_collection
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "showOnEditorial",
    "type": "Boolean"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "size",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "randomizationSeed",
    "type": "String"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "randomizationSeed",
    "variableName": "randomizationSeed"
  },
  {
    "kind": "Variable",
    "name": "showOnEditorial",
    "variableName": "showOnEditorial"
  },
  {
    "kind": "Variable",
    "name": "size",
    "variableName": "size"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectionsRailQuery",
    "selections": [
      {
        "alias": "collections",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectionsRail_collections"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CollectionsRailQuery",
    "selections": [
      {
        "alias": "collections",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollections",
        "plural": true,
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
            "name": "headerImage",
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
            "alias": "price_guidance",
            "args": null,
            "kind": "ScalarField",
            "name": "priceGuidance",
            "storageKey": null
          },
          {
            "alias": "show_on_editorial",
            "args": null,
            "kind": "ScalarField",
            "name": "showOnEditorial",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CollectionsRailQuery",
    "operationKind": "query",
    "text": "query CollectionsRailQuery(\n  $showOnEditorial: Boolean\n  $size: Int\n  $randomizationSeed: String\n) {\n  collections: marketingCollections(showOnEditorial: $showOnEditorial, size: $size, randomizationSeed: $randomizationSeed) {\n    ...CollectionsRail_collections\n    id\n  }\n}\n\nfragment CollectionEntity_collection on MarketingCollection {\n  slug\n  headerImage\n  title\n  price_guidance: priceGuidance\n  show_on_editorial: showOnEditorial\n}\n\nfragment CollectionsRail_collections on MarketingCollection {\n  ...CollectionEntity_collection\n}\n"
  }
};
})();
(node as any).hash = 'e6e181f0317cc4947ddb0d4cf5613dca';
export default node;

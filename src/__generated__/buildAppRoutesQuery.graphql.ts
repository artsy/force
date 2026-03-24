/**
 * @generated SignedSource<<6d3f4e724b89a10c2e8c7fb56b1ad8ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavigationVersionState = "DRAFT" | "LIVE" | "%future added value";
export type buildAppRoutesQuery$variables = {
  requestedVersionState: NavigationVersionState;
};
export type buildAppRoutesQuery$data = {
  readonly artistsNavigation: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenu_navigationVersion" | "NavBarSubMenu_navigationVersion">;
  } | null | undefined;
  readonly artworksNavigation: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenu_navigationVersion" | "NavBarSubMenu_navigationVersion">;
  } | null | undefined;
  readonly whatsNewNavigation: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenu_navigationVersion" | "NavBarSubMenu_navigationVersion">;
  } | null | undefined;
};
export type buildAppRoutesQuery = {
  response: buildAppRoutesQuery$data;
  variables: buildAppRoutesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "requestedVersionState"
  }
],
v1 = {
  "kind": "Variable",
  "name": "state",
  "variableName": "requestedVersionState"
},
v2 = [
  {
    "kind": "Literal",
    "name": "groupID",
    "value": "whats-new"
  },
  (v1/*: any*/)
],
v3 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "NavBarSubMenu_navigationVersion"
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "NavBarMobileSubMenu_navigationVersion"
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "groupID",
    "value": "artists"
  },
  (v1/*: any*/)
],
v5 = [
  {
    "kind": "Literal",
    "name": "groupID",
    "value": "artworks"
  },
  (v1/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "FeaturedLink",
    "kind": "LinkedField",
    "name": "featuredLinksSet",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "format",
            "value": "PLAIN"
          }
        ],
        "kind": "ScalarField",
        "name": "subtitle",
        "storageKey": "subtitle(format:\"PLAIN\")"
      },
      (v7/*: any*/),
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
                "value": 400
              },
              {
                "kind": "Literal",
                "name": "version",
                "value": [
                  "main",
                  "wide",
                  "large_rectangle"
                ]
              },
              {
                "kind": "Literal",
                "name": "width",
                "value": 400
              }
            ],
            "concreteType": "CroppedImageUrl",
            "kind": "LinkedField",
            "name": "cropped",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "width",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "height",
                "storageKey": null
              }
            ],
            "storageKey": "cropped(height:400,version:[\"main\",\"wide\",\"large_rectangle\"],width:400)"
          }
        ],
        "storageKey": null
      },
      (v8/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "NavigationItem",
    "kind": "LinkedField",
    "name": "items",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      (v9/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "NavigationItem",
        "kind": "LinkedField",
        "name": "children",
        "plural": true,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      },
      (v8/*: any*/)
    ],
    "storageKey": null
  },
  (v8/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "buildAppRoutesQuery",
    "selections": [
      {
        "alias": "whatsNewNavigation",
        "args": (v2/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": "artistsNavigation",
        "args": (v4/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": "artworksNavigation",
        "args": (v5/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v3/*: any*/),
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
    "name": "buildAppRoutesQuery",
    "selections": [
      {
        "alias": "whatsNewNavigation",
        "args": (v2/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v10/*: any*/),
        "storageKey": null
      },
      {
        "alias": "artistsNavigation",
        "args": (v4/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v10/*: any*/),
        "storageKey": null
      },
      {
        "alias": "artworksNavigation",
        "args": (v5/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v10/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "431e95cd452abae1950d4aa68a1721f1",
    "id": null,
    "metadata": {},
    "name": "buildAppRoutesQuery",
    "operationKind": "query",
    "text": "query buildAppRoutesQuery(\n  $requestedVersionState: NavigationVersionState!\n) @cacheable {\n  whatsNewNavigation: navigationVersion(groupID: \"whats-new\", state: $requestedVersionState) {\n    ...NavBarSubMenu_navigationVersion\n    ...NavBarMobileSubMenu_navigationVersion\n    id\n  }\n  artistsNavigation: navigationVersion(groupID: \"artists\", state: $requestedVersionState) {\n    ...NavBarSubMenu_navigationVersion\n    ...NavBarMobileSubMenu_navigationVersion\n    id\n  }\n  artworksNavigation: navigationVersion(groupID: \"artworks\", state: $requestedVersionState) {\n    ...NavBarSubMenu_navigationVersion\n    ...NavBarMobileSubMenu_navigationVersion\n    id\n  }\n}\n\nfragment NavBarMenuItemFeaturedLinkColumn_featuredLinkData on FeaturedLink {\n  title\n  subtitle(format: PLAIN)\n  href\n  image {\n    cropped(width: 400, height: 400, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment NavBarMobileSubMenu_navigationVersion on NavigationVersion {\n  items {\n    title\n    position\n    children {\n      title\n      href\n      position\n      id\n    }\n    id\n  }\n}\n\nfragment NavBarSubMenu_navigationVersion on NavigationVersion {\n  featuredLinksSet {\n    ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData\n    id\n  }\n  items {\n    title\n    position\n    children {\n      title\n      href\n      position\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "39ede0365c8c2d3d74ed189c699a41d0";

export default node;

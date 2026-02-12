/**
 * @generated SignedSource<<6583d75d651d04d7a63a019e66760944>>
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
  requstedVersionState: NavigationVersionState;
};
export type buildAppRoutesQuery$data = {
  readonly artistsFeaturedLink: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLinkColumn_featuredLinkData">;
  } | null | undefined> | null | undefined;
  readonly artistsNavigation: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenuServer_navigationVersion" | "NavBarSubMenuServer_navigationVersion">;
  } | null | undefined;
  readonly artworksFeaturedLink: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLinkColumn_featuredLinkData">;
  } | null | undefined> | null | undefined;
  readonly artworksNavigation: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenuServer_navigationVersion" | "NavBarSubMenuServer_navigationVersion">;
  } | null | undefined;
  readonly whatsNewFeaturedLink: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLinkColumn_featuredLinkData">;
  } | null | undefined> | null | undefined;
  readonly whatsNewNavigation: {
    readonly " $fragmentSpreads": FragmentRefs<"NavBarMobileSubMenuServer_navigationVersion" | "NavBarSubMenuServer_navigationVersion">;
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
    "name": "requstedVersionState"
  }
],
v1 = {
  "kind": "Variable",
  "name": "state",
  "variableName": "requstedVersionState"
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
    "name": "NavBarSubMenuServer_navigationVersion"
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "NavBarMobileSubMenuServer_navigationVersion"
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
v6 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "nav-visual:whats-new"
  }
],
v7 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "NavBarMenuItemFeaturedLinkColumn_featuredLinkData"
  }
],
v8 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "nav-visual:artists"
  }
],
v9 = [
  {
    "kind": "Literal",
    "name": "key",
    "value": "nav-visual:artworks"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NavigationItem",
    "kind": "LinkedField",
    "name": "items",
    "plural": true,
    "selections": [
      (v10/*: any*/),
      (v11/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "NavigationItem",
        "kind": "LinkedField",
        "name": "children",
        "plural": true,
        "selections": [
          (v10/*: any*/),
          (v12/*: any*/),
          (v11/*: any*/),
          (v13/*: any*/)
        ],
        "storageKey": null
      },
      (v13/*: any*/)
    ],
    "storageKey": null
  },
  (v13/*: any*/)
],
v15 = [
  (v13/*: any*/)
],
v16 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "items",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          (v10/*: any*/),
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
          (v12/*: any*/),
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
          (v13/*: any*/)
        ],
        "type": "FeaturedLink",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": (v15/*: any*/),
        "type": "Node",
        "abstractKey": "__isNode"
      },
      {
        "kind": "InlineFragment",
        "selections": (v15/*: any*/),
        "type": "Profile",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": (v15/*: any*/),
        "type": "Video",
        "abstractKey": null
      }
    ],
    "storageKey": null
  },
  (v13/*: any*/)
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
      },
      {
        "alias": "whatsNewFeaturedLink",
        "args": (v6/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": (v7/*: any*/),
        "storageKey": "orderedSets(key:\"nav-visual:whats-new\")"
      },
      {
        "alias": "artistsFeaturedLink",
        "args": (v8/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": (v7/*: any*/),
        "storageKey": "orderedSets(key:\"nav-visual:artists\")"
      },
      {
        "alias": "artworksFeaturedLink",
        "args": (v9/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": (v7/*: any*/),
        "storageKey": "orderedSets(key:\"nav-visual:artworks\")"
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
        "selections": (v14/*: any*/),
        "storageKey": null
      },
      {
        "alias": "artistsNavigation",
        "args": (v4/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v14/*: any*/),
        "storageKey": null
      },
      {
        "alias": "artworksNavigation",
        "args": (v5/*: any*/),
        "concreteType": "NavigationVersion",
        "kind": "LinkedField",
        "name": "navigationVersion",
        "plural": false,
        "selections": (v14/*: any*/),
        "storageKey": null
      },
      {
        "alias": "whatsNewFeaturedLink",
        "args": (v6/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": (v16/*: any*/),
        "storageKey": "orderedSets(key:\"nav-visual:whats-new\")"
      },
      {
        "alias": "artistsFeaturedLink",
        "args": (v8/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": (v16/*: any*/),
        "storageKey": "orderedSets(key:\"nav-visual:artists\")"
      },
      {
        "alias": "artworksFeaturedLink",
        "args": (v9/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": (v16/*: any*/),
        "storageKey": "orderedSets(key:\"nav-visual:artworks\")"
      }
    ]
  },
  "params": {
    "cacheID": "d2ce62186549f3a9246595be2adf0d57",
    "id": null,
    "metadata": {},
    "name": "buildAppRoutesQuery",
    "operationKind": "query",
    "text": "query buildAppRoutesQuery(\n  $requstedVersionState: NavigationVersionState!\n) @cacheable {\n  whatsNewNavigation: navigationVersion(groupID: \"whats-new\", state: $requstedVersionState) {\n    ...NavBarSubMenuServer_navigationVersion\n    ...NavBarMobileSubMenuServer_navigationVersion\n    id\n  }\n  artistsNavigation: navigationVersion(groupID: \"artists\", state: $requstedVersionState) {\n    ...NavBarSubMenuServer_navigationVersion\n    ...NavBarMobileSubMenuServer_navigationVersion\n    id\n  }\n  artworksNavigation: navigationVersion(groupID: \"artworks\", state: $requstedVersionState) {\n    ...NavBarSubMenuServer_navigationVersion\n    ...NavBarMobileSubMenuServer_navigationVersion\n    id\n  }\n  whatsNewFeaturedLink: orderedSets(key: \"nav-visual:whats-new\") {\n    ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData\n    id\n  }\n  artistsFeaturedLink: orderedSets(key: \"nav-visual:artists\") {\n    ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData\n    id\n  }\n  artworksFeaturedLink: orderedSets(key: \"nav-visual:artworks\") {\n    ...NavBarMenuItemFeaturedLinkColumn_featuredLinkData\n    id\n  }\n}\n\nfragment NavBarMenuItemFeaturedLinkColumn_featuredLinkData on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      title\n      subtitle(format: PLAIN)\n      href\n      image {\n        cropped(width: 400, height: 400, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n          width\n          height\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment NavBarMobileSubMenuServer_navigationVersion on NavigationVersion {\n  items {\n    title\n    position\n    children {\n      title\n      href\n      position\n      id\n    }\n    id\n  }\n}\n\nfragment NavBarSubMenuServer_navigationVersion on NavigationVersion {\n  items {\n    title\n    position\n    children {\n      title\n      href\n      position\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c981191287fd6d5693cc78fc645aa77e";

export default node;

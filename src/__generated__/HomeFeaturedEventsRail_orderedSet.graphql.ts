/**
 * @generated SignedSource<<9fd8b49d1f5c3638859ac6b61119fe2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedEventsRail_orderedSet$data = {
  readonly items: ReadonlyArray<{
    readonly __typename: "FeaturedLink";
    readonly href: string | null | undefined;
    readonly image: {
      readonly large: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
      readonly small: {
        readonly height: number;
        readonly src: string;
        readonly srcSet: string;
        readonly width: number;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly subtitle: string | null | undefined;
    readonly title: string | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "HomeFeaturedEventsRail_orderedSet";
};
export type HomeFeaturedEventsRail_orderedSet$key = {
  readonly " $data"?: HomeFeaturedEventsRail_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide",
    "large_rectangle"
  ]
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedEventsRail_orderedSet",
  "selections": [
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
              "name": "href",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": "small",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 63
                    },
                    (v0/*: any*/),
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 95
                    }
                  ],
                  "concreteType": "CroppedImageUrl",
                  "kind": "LinkedField",
                  "name": "cropped",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/),
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
                  "storageKey": "cropped(height:63,version:[\"main\",\"wide\",\"large_rectangle\"],width:95)"
                },
                {
                  "alias": "large",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 297
                    },
                    (v0/*: any*/),
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 445
                    }
                  ],
                  "concreteType": "CroppedImageUrl",
                  "kind": "LinkedField",
                  "name": "cropped",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/)
                  ],
                  "storageKey": "cropped(height:297,version:[\"main\",\"wide\",\"large_rectangle\"],width:445)"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "FeaturedLink",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
})();

(node as any).hash = "12d52ffc1a89ddb9b661fb39aed95546";

export default node;

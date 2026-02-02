/**
 * @generated SignedSource<<2b0e5c78d086e90ad6bb192104faaf2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarMenuItemFeaturedLink_orderedSet$data = {
  readonly internalID: string;
  readonly itemType: string | null | undefined;
  readonly items: ReadonlyArray<{
    readonly __typename: "FeaturedLink";
    readonly href: string | null | undefined;
    readonly image: {
      readonly resized: {
        readonly src: string;
        readonly srcSet: string;
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
  readonly " $fragmentType": "NavBarMenuItemFeaturedLink_orderedSet";
};
export type NavBarMenuItemFeaturedLink_orderedSet$key = {
  readonly " $data"?: NavBarMenuItemFeaturedLink_orderedSet$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarMenuItemFeaturedLink_orderedSet">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarMenuItemFeaturedLink_orderedSet",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemType",
      "storageKey": null
    },
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
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
                  "storageKey": "resized(height:400,version:[\"main\",\"wide\",\"large_rectangle\"])"
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

(node as any).hash = "5e3d1f93fca56575c2c9c4cbcc064799";

export default node;

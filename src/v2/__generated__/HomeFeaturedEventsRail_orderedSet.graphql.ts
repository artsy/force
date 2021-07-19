/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedEventsRail_orderedSet = {
    readonly items: ReadonlyArray<({
        readonly __typename: "FeaturedLink";
        readonly internalID: string | null;
        readonly title: string | null;
        readonly subtitle: string | null;
        readonly href: string | null;
        readonly image: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "HomeFeaturedEventsRail_orderedSet";
};
export type HomeFeaturedEventsRail_orderedSet$data = HomeFeaturedEventsRail_orderedSet;
export type HomeFeaturedEventsRail_orderedSet$key = {
    readonly " $data"?: HomeFeaturedEventsRail_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
};



const node: ReaderFragment = {
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
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 63
                    },
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
                  "storageKey": "cropped(height:63,width:95)"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "FeaturedLink"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet"
};
(node as any).hash = '6c88a0ed5302a1aaad0774e619990b2c';
export default node;

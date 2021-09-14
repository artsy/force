/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedGalleriesRail_orderedSet = {
    readonly items: ReadonlyArray<({
        readonly __typename: "FeaturedLink";
        readonly internalID: string | null;
        readonly title: string | null;
        readonly subtitle: string | null;
        readonly href: string | null;
        readonly image: {
            readonly small: {
                readonly src: string;
                readonly srcSet: string;
                readonly width: number;
                readonly height: number;
            } | null;
            readonly large: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "HomeFeaturedGalleriesRail_orderedSet";
};
export type HomeFeaturedGalleriesRail_orderedSet$data = HomeFeaturedGalleriesRail_orderedSet;
export type HomeFeaturedGalleriesRail_orderedSet$key = {
    readonly " $data"?: HomeFeaturedGalleriesRail_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedGalleriesRail_orderedSet">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v1 = {
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
  "name": "HomeFeaturedGalleriesRail_orderedSet",
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
                    (v0/*: any*/),
                    (v1/*: any*/),
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
                  "storageKey": "cropped(height:63,width:95)"
                },
                {
                  "alias": "large",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 297
                    },
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
                    (v0/*: any*/),
                    (v1/*: any*/)
                  ],
                  "storageKey": "cropped(height:297,width:445)"
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
})();
(node as any).hash = '8741c46b608f476fcde0f4298bb54586';
export default node;

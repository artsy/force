/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedShows_orderedSet = {
    readonly items: ReadonlyArray<({
        readonly __typename: "Show";
        readonly internalID: string;
        readonly name: string | null;
        readonly href: string | null;
        readonly startAt: string | null;
        readonly endAt: string | null;
        readonly partner: {
            readonly name?: string | null;
        } | null;
        readonly coverImage: {
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
    readonly " $refType": "HomeFeaturedShows_orderedSet";
};
export type HomeFeaturedShows_orderedSet$data = HomeFeaturedShows_orderedSet;
export type HomeFeaturedShows_orderedSet$key = {
    readonly " $data"?: HomeFeaturedShows_orderedSet$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedShows_orderedSet">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeaturedShows_orderedSet",
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "href",
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "MMM D"
                }
              ],
              "kind": "ScalarField",
              "name": "startAt",
              "storageKey": "startAt(format:\"MMM D\")"
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "D"
                }
              ],
              "kind": "ScalarField",
              "name": "endAt",
              "storageKey": "endAt(format:\"D\")"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": (v1/*: any*/),
                  "type": "Partner"
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v1/*: any*/),
                  "type": "ExternalPartner"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "coverImage",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 450
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 600
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
                  "storageKey": "cropped(height:450,width:600)"
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Show"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet"
};
})();
(node as any).hash = 'f580b20e43b2f26b8e624efed1d6c154';
export default node;

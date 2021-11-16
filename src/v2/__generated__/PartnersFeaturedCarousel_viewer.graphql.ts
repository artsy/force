/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersFeaturedCarousel_viewer = {
    readonly orderedSet: {
        readonly items: ReadonlyArray<{
            readonly internalID?: string;
            readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarouselCell_profile">;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnersFeaturedCarousel_viewer";
};
export type PartnersFeaturedCarousel_viewer$data = PartnersFeaturedCarousel_viewer;
export type PartnersFeaturedCarousel_viewer$key = {
    readonly " $data"?: PartnersFeaturedCarousel_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFeaturedCarousel_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersFeaturedCarousel_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "OrderedSet",
      "kind": "LinkedField",
      "name": "orderedSet",
      "plural": false,
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PartnersFeaturedCarouselCell_profile"
                }
              ],
              "type": "Profile"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
(node as any).hash = '7a1ee54071a4522594bd6513970e63a7';
export default node;

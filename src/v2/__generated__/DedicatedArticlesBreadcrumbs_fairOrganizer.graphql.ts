/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DedicatedArticlesBreadcrumbs_fairOrganizer = {
    readonly slug: string;
    readonly name: string | null;
    readonly profile: {
        readonly image: {
            readonly resized: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "DedicatedArticlesBreadcrumbs_fairOrganizer";
};
export type DedicatedArticlesBreadcrumbs_fairOrganizer$data = DedicatedArticlesBreadcrumbs_fairOrganizer;
export type DedicatedArticlesBreadcrumbs_fairOrganizer$key = {
    readonly " $data"?: DedicatedArticlesBreadcrumbs_fairOrganizer$data;
    readonly " $fragmentRefs": FragmentRefs<"DedicatedArticlesBreadcrumbs_fairOrganizer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DedicatedArticlesBreadcrumbs_fairOrganizer",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
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
                  "value": 30
                },
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 30
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
              "storageKey": "resized(height:30,version:\"square\",width:30)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FairOrganizer",
  "abstractKey": null
};
(node as any).hash = '322d075ec0670293841ce10f1aa54c40';
export default node;

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
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "DedicatedArticlesBreadcrumbs_fairOrganizer";
};
export type DedicatedArticlesBreadcrumbs_fairOrganizer$data = DedicatedArticlesBreadcrumbs_fairOrganizer;
export type DedicatedArticlesBreadcrumbs_fairOrganizer$key = {
    readonly " $data"?: DedicatedArticlesBreadcrumbs_fairOrganizer$data | undefined;
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
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
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
(node as any).hash = '926158cf56d60a6398c8cc2568267f3a';
export default node;

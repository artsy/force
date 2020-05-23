/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type createTestEnv_artwork = {
    readonly title: string | null;
    readonly artist: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "createTestEnv_artwork";
};
export type createTestEnv_artwork$data = createTestEnv_artwork;
export type createTestEnv_artwork$key = {
    readonly " $data"?: createTestEnv_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"createTestEnv_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "createTestEnv_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '77748b446a7cb5332e22b3fc524700a1';
export default node;

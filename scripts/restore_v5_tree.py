"""Restore the V5 redesign working tree from commit 154f04f (dev) into the
repo while staying on `main` (latest org main). Excludes .git/node_modules/.next."""
import pathlib, shutil

REPO = pathlib.Path('/home/ubuntu/Enigma-Website')
COMMIT = '154f04f'
SKIP = {'.git', 'node_modules', '.next', 'scripts'}

import subprocess
tmp = pathlib.Path('/tmp/v5_tree_src')
tmp.mkdir(exist_ok=True)
# checkout tree into tmp dir
subprocess.run(['git', 'archive', COMMIT, '-o', '/tmp/v5tree.tar'], cwd=REPO, check=True)
for p in tmp.iterdir():
    shutil.rmtree(p) if p.is_dir() else p.unlink()
subprocess.run(['tar', '-xf', '/tmp/v5tree.tar', '-C', str(tmp)], check=True)

repo_items = [p for p in REPO.iterdir() if p.name not in SKIP]
tmp_items = {p.name: p for p in tmp.iterdir()}

# Remove items in repo not in the new tree
for p in repo_items:
    if p.name not in tmp_items:
        if p.is_dir():
            shutil.rmtree(p)
        else:
            p.unlink()
        print('removed', p.name)

# Copy items from new tree (dirs with copytree dirs_exist_ok)
for name, p in list(tmp_items.items()):
    dst = REPO / name
    if p.is_file():
        shutil.copy2(p, dst)
    else:
        shutil.copytree(p, dst, dirs_exist_ok=True)

print('V5 tree restored. New files:', sorted(set(tmp_items) - {p.name for p in repo_items}))

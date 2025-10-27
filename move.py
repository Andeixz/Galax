import re
import os

# --- KONFIGURASI ---
# Ganti dengan nama file Anda yang berisi kode tercampur
nama_file_input = 'file_tercampur.html' 
# Nama file output
nama_file_html_output = 'index.html'
nama_file_css_output = 'style.css'
nama_file_js_output = 'script.js'
# Nama folder untuk menyimpan file
css_folder_name = 'css'
js_folder_name = 'js'
# -------------------

# Fungsi untuk membuat folder jika belum ada
def buat_folder(path):
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"📁 Folder '{path}' berhasil dibuat.")
    else:
        print(f"📁 Folder '{path}' sudah ada.")

try:
    # Baca file input
    with open(nama_file_input, 'r', encoding='utf-8') as f:
        konten = f.read()

    # Buat folder yang diperlukan
    buat_folder(css_folder_name)
    buat_folder(js_folder_name)

    # --- 1. EKSTRAK CSS ---
    pola_css = re.compile(r'<style[^>]*>(.*?)</style>', re.DOTALL)
    cocokan_css = pola_css.search(konten)

    if cocokan_css:
        css_content = cocokan_css.group(1).strip()
        # Buat path lengkap untuk file CSS
        path_css = os.path.join(css_folder_name, nama_file_css_output)
        with open(path_css, 'w', encoding='utf-8') as f_css:
            f_css.write(css_content)
        print(f"✅ CSS berhasil diekstrak dan disimpan ke '{path_css}'")
    else:
        print("⚠️ Tidak menemukan tag <style> di dalam file.")

    # --- 2. EKSTRAK JAVASCRIPT ---
    pola_js = re.compile(r'<script[^>]*>(.*?)</script>', re.DOTALL)
    semua_js_ditemukan = pola_js.findall(konten)
    
    if semua_js_ditemukan:
        js_content = "\n\n".join(filter(None, [js.strip() for js in semua_js_ditemukan]))
        if js_content:
            # Buat path lengkap untuk file JS
            path_js = os.path.join(js_folder_name, nama_file_js_output)
            with open(path_js, 'w', encoding='utf-8') as f_js:
                f_js.write(js_content)
            print(f"✅ JavaScript berhasil diekstrak dan disimpan ke '{path_js}'")
        else:
            print("⚠️ Menemukan tag <script> tetapi isinya kosong.")
    else:
        print("⚠️ Tidak menemukan tag <script> dengan konten di dalam file.")

    # --- 3. BERSIHKAN HTML ---
    konten_html_bersih = pola_css.sub('', konten)
    konten_html_bersih = pola_js.sub('', konten_html_bersih).strip()

    with open(nama_file_html_output, 'w', encoding='utf-8') as f_html:
        f_html.write(konten_html_bersih)
    
    print(f"✅ HTML (tanpa CSS & JS) berhasil disimpan ke '{nama_file_html_output}'")
    print("\n--- Proses Selesai! ---")

except FileNotFoundError:
    print(f"❌ Error: File '{nama_file_input}' tidak ditemukan. Pastikan nama file sudah benar.")
except Exception as e:
    print(f"❌ Terjadi error: {e}")
